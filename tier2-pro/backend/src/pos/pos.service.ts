import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Transaction } from './transaction.entity';
import { TransactionItem } from './transaction-item.entity';
import { Product } from '../products/product.entity';
import { CreateTransactionDto } from './dto/pos.dto';

@Injectable()
export class PosService {
  constructor(
    @InjectRepository(Transaction) private txRepo: Repository<Transaction>,
    @InjectRepository(TransactionItem) private itemRepo: Repository<TransactionItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async createTransaction(dto: CreateTransactionDto, user_id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let total = 0;
      for (const item of dto.items) {
        const product = await queryRunner.manager.findOne(Product, { where: { product_id: item.product_id } });
        if (!product) throw new NotFoundException(`Produk ${item.product_id} tidak ditemukan`);
        if (product.stock < item.qty) {
          throw new BadRequestException(`Stok ${product.name} tidak cukup (tersisa ${product.stock})`);
        }
        await queryRunner.manager.update(Product, { product_id: item.product_id }, { stock: product.stock - item.qty });
        total += item.unit_price * item.qty;
      }

      const tx = this.txRepo.create({
        store_id: dto.store_id,
        user_id,
        payment_method: dto.payment_method || 'cash',
        total,
        status: 'paid',
        notes: dto.notes,
      });
      const savedTx = await queryRunner.manager.save(tx);

      for (const item of dto.items) {
        const txItem = this.itemRepo.create({
          transaction_id: savedTx.transaction_id,
          product_id: item.product_id,
          tier_name: item.tier_name || 'HET',
          qty: item.qty,
          unit_price: item.unit_price,
          subtotal: item.qty * item.unit_price,
        });
        await queryRunner.manager.save(txItem);
      }

      await queryRunner.commitTransaction();
      return { success: true, transaction_id: savedTx.transaction_id, total };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getTransactions(store_id: string, page = 1, limit = 20) {
    const [items, total] = await this.txRepo.findAndCount({
      where: { store_id },
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data: items, total, page, limit };
  }

  async getTransactionDetail(transaction_id: string) {
    const tx = await this.txRepo.findOne({ where: { transaction_id } });
    if (!tx) throw new NotFoundException('Transaksi tidak ditemukan');
    const items = await this.itemRepo.find({ where: { transaction_id } });
    return { ...tx, items };
  }

  async voidTransaction(transaction_id: string) {
    const tx = await this.txRepo.findOne({ where: { transaction_id } });
    if (!tx) throw new NotFoundException('Transaksi tidak ditemukan');
    if (tx.status === 'voided') throw new BadRequestException('Transaksi sudah di-void');
    const items = await this.itemRepo.find({ where: { transaction_id } });

    for (const item of items) {
      await this.productRepo.increment({ product_id: item.product_id }, 'stock', item.qty);
    }
    await this.txRepo.update(transaction_id, { status: 'voided' });
    return { success: true };
  }
}
