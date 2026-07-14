import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PosService } from './pos.service';
import { CreateTransactionDto } from './dto/pos.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('POS / Transaksi')
@Controller({ path: 'transactions', version: '1' })
@UseGuards(JwtAuthGuard)
export class PosController {
  constructor(private service: PosService) {}

  @Post()
  @ApiOperation({ summary: 'Buat transaksi baru (decrement stok)' })
  async create(@Body() dto: CreateTransactionDto, @Query('user_id') user_id: string) {
    return this.service.createTransaction(dto, user_id);
  }

  @Get()
  @ApiOperation({ summary: 'List transaksi (paginated)' })
  async findAll(@Query('store_id') store_id: string, @Query('page') page: number, @Query('limit') limit: number) {
    return this.service.getTransactions(store_id, page || 1, limit || 20);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail transaksi + items' })
  async findOne(@Param('id') id: string) {
    return this.service.getTransactionDetail(id);
  }

  @Post(':id/void')
  @ApiOperation({ summary: 'Void transaksi (restock)' })
  async void(@Param('id') id: string) {
    return this.service.voidTransaction(id);
  }
}
