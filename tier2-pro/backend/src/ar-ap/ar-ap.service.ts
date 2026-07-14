import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, Between } from 'typeorm';
import { AccountsReceivable, AccountsPayable } from './ar-ap.entity';

@Injectable()
export class ArApService {
  constructor(
    @InjectRepository(AccountsReceivable) private arRepo: Repository<AccountsReceivable>,
    @InjectRepository(AccountsPayable) private apRepo: Repository<AccountsPayable>,
  ) {}

  // AR - Piutang
  async createAr(dto: { store_id: string; customer_name: string; customer_wa?: string; invoice_number?: string; total_amount: number; due_date: Date; notes?: string }) {
    const ar = this.arRepo.create(dto);
    return this.arRepo.save(ar);
  }

  async getAr(store_id: string, status?: string) {
    const qb = this.arRepo.createQueryBuilder('ar').where('ar.store_id = :store_id', { store_id });
    if (status) qb.andWhere('ar.status = :status', { status });
    qb.orderBy('ar.due_date', 'ASC');
    return qb.getMany();
  }

  async payAr(ar_id: string, amount: number) {
    const ar = await this.arRepo.findOne({ where: { ar_id } });
    if (!ar) throw new NotFoundException('Piutang tidak ditemukan');
    if (ar.paid_amount + amount > ar.total_amount) throw new BadRequestException('Pembayaran melebihi total piutang');
    ar.paid_amount = Number(ar.paid_amount) + amount;
    ar.status = ar.paid_amount >= ar.total_amount ? 'paid' : 'active';
    return this.arRepo.save(ar);
  }

  async agingAr(store_id: string) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return this.arRepo
      .createQueryBuilder('ar')
      .where('ar.store_id = :store_id', { store_id })
      .andWhere('ar.status IN (:...statuses)', { statuses: ['active', 'overdue'] })
      .addSelect("CASE WHEN ar.due_date < :today THEN 'overdue' ELSE 'active' END", 'aging_status')
      .setParameter('today', today)
      .addSelect("DATE_PART('day', :today - ar.due_date)", 'days_overdue')
      .setParameter('today', today)
      .orderBy('ar.due_date', 'ASC')
      .getMany();
  }

  // AP - Hutang
  async createAp(dto: { store_id: string; vendor_name: string; vendor_wa?: string; invoice_number?: string; total_amount: number; due_date: Date; notes?: string }) {
    const ap = this.apRepo.create(dto);
    return this.apRepo.save(ap);
  }

  async getAp(store_id: string, status?: string) {
    const qb = this.apRepo.createQueryBuilder('ap').where('ap.store_id = :store_id', { store_id });
    if (status) qb.andWhere('ap.status = :status', { status });
    qb.orderBy('ap.due_date', 'ASC');
    return qb.getMany();
  }

  async payAp(ap_id: string, amount: number) {
    const ap = await this.apRepo.findOne({ where: { ap_id } });
    if (!ap) throw new NotFoundException('Hutang tidak ditemukan');
    if (ap.paid_amount + amount > ap.total_amount) throw new BadRequestException('Pembayaran melebihi total hutang');
    ap.paid_amount = Number(ap.paid_amount) + amount;
    ap.status = ap.paid_amount >= ap.total_amount ? 'paid' : 'active';
    return this.apRepo.save(ap);
  }

  async agingAp(store_id: string) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return this.apRepo
      .createQueryBuilder('ap')
      .where('ap.store_id = :store_id', { store_id })
      .andWhere('ap.status IN (:...statuses)', { statuses: ['active', 'overdue'] })
      .addSelect("CASE WHEN ap.due_date < :today THEN 'overdue' ELSE 'active' END", 'aging_status')
      .setParameter('today', today)
      .addSelect("DATE_PART('day', :today - ap.due_date)", 'days_overdue')
      .setParameter('today', today)
      .orderBy('ap.due_date', 'ASC')
      .getMany();
  }
}