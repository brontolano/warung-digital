import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm'; import { ReportsController } from './reports.controller'; import { ReportsService } from './reports.service';
import { Transaction } from '../pos/transaction.entity'; import { TransactionItem } from '../pos/transaction-item.entity'; import { AccountsReceivable, AccountsPayable } from '../ar-ap/ar-ap.entity';
@Module({ imports: [TypeOrmModule.forFeature([Transaction, TransactionItem, AccountsReceivable, AccountsPayable])], controllers: [ReportsController], providers: [ReportsService] })
export class ReportsModule {}
