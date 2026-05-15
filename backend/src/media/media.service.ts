import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MediaService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      endpoint: this.configService.get('AWS_ENDPOINT'), // For R2/LocalStack
    });
    this.bucketName = this.configService.get('AWS_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File, folder = 'general') {
    const key = `${folder}/${uuid()}-${file.originalname}`;
    let buffer = file.buffer;

    // Compress images
    if (file.mimetype.startsWith('image/')) {
      buffer = await sharp(file.buffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
    }

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.mimetype.startsWith('image/') ? 'image/webp' : file.mimetype,
      }),
    );

    return {
      key,
      url: `${this.configService.get('CDN_URL')}/${key}`,
    };
  }

  async getPresignedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}
