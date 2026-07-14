import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockOpname, StockOpnameItem } from './stock.entity';
import { StockController } from './stock.controller';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockOpname, StockOpnameItem, Product])],
  controllers: [StockController],
})
export class StockModule {}
