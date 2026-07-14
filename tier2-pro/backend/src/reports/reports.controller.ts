import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) @Controller('v1/reports')
export class ReportsController {
  constructor(private s: ReportsService) {}
  @Get('profit-loss') profitLoss(@Query('store_id') sid: string, @Query('start_date') sd: string, @Query('end_date') ed: string) { return this.s.profitLoss(sid, sd, ed); }
  @Get('top-products') topProducts(@Query('store_id') sid: string, @Query('limit') l: number) { return this.s.topProducts(sid, l); }
}
