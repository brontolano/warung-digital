import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ArApService } from './ar-ap.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) @Controller('v1')
export class ArApController {
  constructor(private s: ArApService) {}
  @Get('ar') getAr(@Query('store_id') sid: string) { return this.s.getAr(sid); }
  @Post('ar') createAr(@Body() dto: any) { return this.s.createAr(dto); }
  @Post('ar/:id/pay') payAr(@Param('id') id: string, @Body() dto: any) { return this.s.payAr(id, dto.amount); }
  @Get('ap') getAp(@Query('store_id') sid: string) { return this.s.getAp(sid); }
  @Post('ap') createAp(@Body() dto: any) { return this.s.createAp(dto); }
  @Post('ap/:id/pay') payAp(@Param('id') id: string, @Body() dto: any) { return this.s.payAp(id, dto.amount); }
}
