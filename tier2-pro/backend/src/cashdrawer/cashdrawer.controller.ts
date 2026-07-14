import { Controller, Post, Body, Param, Get, Query, UseGuards } from '@nestjs/common';
import { CashdrawerService } from './cashdrawer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) @Controller('v1/cashdrawer')
export class CashdrawerController {
  constructor(private s: CashdrawerService) {}
  @Post('open') open(@Body() dto: any, @Query('user_id') uid: string) { return this.s.open(dto, uid); }
  @Post(':id/close') close(@Param('id') id: string, @Body() dto: any) { return this.s.close(id, dto); }
  @Get('history') history(@Query('store_id') sid: string) { return this.s.history(sid); }
}
