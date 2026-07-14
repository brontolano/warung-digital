import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';
import { Transaction } from './transaction.entity';
import { TransactionItem } from './transaction-item.entity';
import { Product } from '../products/product.entity';

@Module({ imports: [TypeOrmModule.forFeature([Transaction, TransactionItem, Product])], controllers: [PosController], providers: [PosService] })
export class PosModule {}
