import { Controller, Post, Get, Body, Param, Req, Patch, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('products')
  async create(@Body() data: any) {
    return this.catalogService.createProduct(data.businessId, data);
  }

  @Get('products/:businessId')
  async findAll(@Param('businessId') businessId: string) {
    return this.catalogService.getProducts(businessId);
  }

  @Patch('products/:id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.catalogService.updateProduct(id, data);
  }

  @Delete('products/:id')
  async remove(@Param('id') id: string) {
    return this.catalogService.deleteProduct(id);
  }

  @Post('inquiry')
  async createInquiry(@Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.catalogService.createInquiry(data.productId, userId, data.chatId, data.message);
  }

  @Post('bulk')
  async bulkUpload(@Body() data: any) {
    return this.catalogService.bulkUpload(data.businessId, data.products);
  }
}
