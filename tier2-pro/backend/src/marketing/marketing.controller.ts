import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) @Controller('v1')
export class MarketingController {
  constructor(private s: MarketingService) {}
  @Get('loyalty/:wa') cekPoin(@Param('wa') wa: string) { return this.s.cekPoin(wa); }
  @Post('loyalty/redeem') redeem(@Body() dto: any) { return this.s.redeem(dto); }
  @Get('commissions') komisi(@Query('store_id') sid: string) { return this.s.komisi(sid); }
}
