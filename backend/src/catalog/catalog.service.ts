import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageType } from '@prisma/client';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async createProduct(businessId: string, data: any) {
    return this.prisma.product.create({
      data: {
        businessId,
        name: data.name,
        description: data.description,
        price: data.price,
        offerPrice: data.offerPrice,
        sku: data.sku,
        stockStatus: data.stockStatus || 'IN_STOCK',
        categoryId: data.categoryId,
        collectionId: data.collectionId,
        media: {
          create: data.media?.map((m: any) => ({
            type: m.type || MessageType.IMAGE,
            url: m.url,
          })),
        },
      },
    });
  }

  async getProducts(businessId: string) {
    return this.prisma.product.findMany({
      where: { businessId, isHidden: false },
      include: {
        media: true,
        category: true,
        collection: true,
      },
    });
  }

  async updateProduct(productId: string, data: any) {
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        offerPrice: data.offerPrice,
        sku: data.sku,
        stockStatus: data.stockStatus,
        isHidden: data.isHidden,
      },
    });
  }

  async deleteProduct(productId: string) {
    return this.prisma.product.delete({
      where: { id: productId },
    });
  }

  async createInquiry(productId: string, userId: string, chatId: string, message: string) {
    return this.prisma.productInquiry.create({
      data: {
        productId,
        userId,
        chatId,
        message,
      },
    });
  }

  async bulkUpload(businessId: string, products: any[]) {
    // Basic implementation for bulk upload
    const operations = products.map(p => 
      this.prisma.product.create({
        data: {
          businessId,
          name: p.name,
          description: p.description,
          price: p.price,
          sku: p.sku,
        }
      })
    );
    return Promise.all(operations);
  }
}
