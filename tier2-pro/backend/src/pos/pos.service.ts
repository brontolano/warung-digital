import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionItem } from './transaction-item.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class PosService {
  constructor(@InjectRepository(Transaction) private txRepo: Repository<Transaction>, @InjectRepository(TransactionItem) private itemRepo: Repository<TransactionItem>, @InjectRepository(Product) private productRepo: Repository<Product>, private dataSource: DataSource) {}

  async create(dto: any, user_id: string) {
    const qr = this.dataSource.createQueryRunner(); await qr.connect(); await qr.startTransaction();
    try {
      let total = 0;
      for (const item of dto.items) {
        const p = await qr.manager.findOne(Product, { where: { product_id: item.product_id } });
        if (!p) throw new NotFoundException(`Produk ${item.product_id} tidak ditemukan`);
        if (p.stock < item.qty) throw new BadRequestException(`Stok ${p.name} tidak cukup (${p.stock})`);
        await qr.manager.update(Product, { product_id: item.product_id }, { stock: p.stock - item.qty });
        total += item.unit_price * item.qty;
        await qr.manager.save(TransactionItem, { transaction_id: '', product_id: item.product_id, qty: item.qty, unit_price: item.unit_price, subtotal: item.qty * item.unit_price });
      }
      const tx = await qr.manager.save(Transaction, { store_id: dto.store_id, user_id, total, payment_method: dto.payment_method || 'cash', status: 'paid' });
      await qr.commitTransaction();
      return { success: true, transaction_id: tx.transaction_id, total };
    } catch (e) { await qr.rollbackTransaction(); throw e; } finally { await qr.release(); }
  }

  async findAll(store_id: string, page = 1, limit = 20) {
    const [data, total] = await this.txRepo.findAndCount({ where: { store_id }, order: { created_at: 'DESC' }, skip: (page - 1) * limit, take: limit });
    return { data, total, page, limit };
  }
  async findOne(id: string) { const tx = await this.txRepo.findOne({ where: { transaction_id: id } }); if (!tx) throw new NotFoundException(); const items = await this.itemRepo.find({ where: { transaction_id: id } }); return { ...tx, items }; }
  async void(id: string) { const tx = await this.txRepo.findOne({ where: { transaction_id: id } }); if (!tx) throw new NotFoundException(); const items = await this.itemRepo.find({ where: { transaction_id: id } }); for (const i of items) { await this.productRepo.increment({ product_id: i.product_id }, 'stock', i.qty); } await this.txRepo.update(id, { status: 'voided' }); return { success: true }; }
}
