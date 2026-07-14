import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { StorefrontService } from './storefront.service';

@Controller('v1/storefront')
export class StorefrontController {
  constructor(private s: StorefrontService) {}
  @Get(':slug') getStore(@Param('slug') slug: string) { return this.s.getStore(slug); }
  @Get(':slug/products') getProducts(@Param('slug') slug: string) { return this.s.getProducts(slug); }
  @Get(':slug/products/:id/price') getPrice(@Param('slug') slug: string, @Param('id') id: string, @Query('qty') qty: number) { return this.s.getPrice(slug, id, qty || 1); }
  @Post(':slug/checkout') checkout(@Param('slug') slug: string, @Body() dto: any) { return this.s.checkout(slug, dto); }
}
