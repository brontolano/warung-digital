import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockOpname, StockOpnameItem } from './stock.entity';
import { Product } from '../products/product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('v1/stock-opname')
export class StockController {
  constructor(
    @InjectRepository(StockOpname) private opnameRepo: Repository<StockOpname>,
    @InjectRepository(StockOpnameItem) private itemRepo: Repository<StockOpnameItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  @Post()
  async create(@Body() dto: { store_id: string; user_id: string; notes?: string; items: { product_id: string; physical_stock: number }[] }) {
    const opname = await this.opnameRepo.save(this.opnameRepo.create({
      store_id: dto.store_id, user_id: dto.user_id, notes: dto.notes, status: 'draft'
    }));
    for (const item of dto.items) {
      const product = await this.productRepo.findOne({ where: { product_id: item.product_id } });
      if (product) {
        const diff = item.physical_stock - product.stock;
        await this.itemRepo.save(this.itemRepo.create({
          opname_id: opname.opname_id, product_id: item.product_id,
          system_stock: product.stock, physical_stock: item.physical_stock, difference: diff
        }));
      }
    }
    return { success: true, opname_id: opname.opname_id };
  }

  @Post(':id/confirm')
  async confirm(@Param('id') id: string) {
    const opname = await this.opnameRepo.findOne({ where: { opname_id: id } });
    if (!opname) return { success: false, error: 'Tidak ditemukan' };
    const items = await this.itemRepo.find({ where: { opname_id: id } });
    for (const item of items) {
      await this.productRepo.update(item.product_id, { stock: item.physical_stock });
    }
    await this.opnameRepo.update(id, { status: 'completed', completed_at: new Date() });
    return { success: true };
  }

  @Get()
  async list(@Query('store_id') sid: string) {
    return this.opnameRepo.find({ where: { store_id: sid }, order: { created_at: 'DESC' } });
  }
}
