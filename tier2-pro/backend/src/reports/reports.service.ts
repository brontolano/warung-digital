import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction } from '../pos/transaction.entity';
import { TransactionItem } from '../pos/transaction-item.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Transaction) private txRepo: Repository<Transaction>, @InjectRepository(TransactionItem) private itemRepo: Repository<TransactionItem>) {}

  async profitLoss(store_id: string, start_date: string, end_date: string) {
    const start = new Date(start_date); const end = new Date(end_date); end.setHours(23, 59, 59, 999);
    const tx = await this.txRepo.find({ where: { store_id, created_at: Between(start, end), status: 'paid' } });
    let total = 0; tx.forEach(t => { total += parseFloat(String(t.total)); });
    return { period: { start: start_date, end: end_date }, total_revenue: total, transaction_count: tx.length };
  }

  async topProducts(store_id: string, limit = 10) {
    return this.itemRepo.createQueryBuilder('i').innerJoin('i.transaction', 't').where('t.store_id = :store_id', { store_id }).andWhere('t.status = :status', { status: 'paid' })
      .select('i.product_id', 'product_id').addSelect('SUM(i.subtotal)', 'total_revenue').groupBy('i.product_id').orderBy('SUM(i.subtotal)', 'DESC').limit(limit).getRawMany();
  }
}
