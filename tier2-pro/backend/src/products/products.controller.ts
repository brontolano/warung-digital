import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Products') @Controller({ path: 'products', version: '1' }) @UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private service: ProductsService) {}
  @Get() findAll(@Query('store_id') store_id: string) { return this.service.findAll(store_id); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() dto: any) { return this.service.create(dto.store_id, dto); }
  @Put(':id') update(@Param('id') id: string, @Body() dto: any) { return this.service.update(id, dto); }
  @Delete(':id') delete(@Param('id') id: string) { return this.service.delete(id); }
  @Post(':id/tiers') addTier(@Param('id') id: string, @Body() dto: any) { return this.service.addTier(id, dto.tier_name, dto.min_qty, dto.price); }
  @Get(':id/price') getPrice(@Param('id') id: string, @Query('qty') qty: number) { return this.service.getPrice(id, qty || 1); }
}
