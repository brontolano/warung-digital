import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PosService } from './pos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('POS') @Controller({ path: 'transactions', version: '1' }) @UseGuards(JwtAuthGuard)
export class PosController {
  constructor(private service: PosService) {}
  @Post() create(@Body() dto: any, @Query('user_id') uid: string) { return this.service.create(dto, uid); }
  @Get() findAll(@Query('store_id') sid: string, @Query('page') p: number, @Query('limit') l: number) { return this.service.findAll(sid, p || 1, l || 20); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post(':id/void') void(@Param('id') id: string) { return this.service.void(id); }
}
