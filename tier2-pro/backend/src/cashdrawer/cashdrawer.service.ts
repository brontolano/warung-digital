import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, IsNull } from 'typeorm';

import { CashdrawerShift, CashdrawerTransaction } from './cashdrawer.entity';
import { Transaction } from '../pos/transaction.entity';
import { OpenShiftDto, CloseShiftDto } from './dto/cashdrawer.dto';

@Injectable()
export class CashdrawerService {
  constructor(
    @InjectRepository(CashdrawerShift) private shiftRepo: Repository<CashdrawerShift>,
    @InjectRepository(CashdrawerTransaction) private cdTxRepo: Repository<CashdrawerTransaction>,
    @InjectRepository(Transaction) private txRepo: Repository<Transaction>,
  ) {}

  async openShift(dto: OpenShiftDto, user_id: string) {
    const openShift = await this.shiftRepo.findOne({
      where: { store_id: dto.store_id, status: 'open' },
    });
    if (openShift) throw new BadRequestException('Masih ada shift yang buka. Tutup dulu sebelum buka shift baru.');

    const shift = this.shiftRepo.create({
      store_id: dto.store_id,
      user_id,
      opening_balance: dto.opening_balance,
      status: 'open',
      notes: dto.notes,
    });
    const saved = await this.shiftRepo.save(shift);
    return { success: true, shift_id: saved.shift_id, opening_balance: saved.opening_balance };
  }

  async closeShift(shift_id: string, dto: CloseShiftDto) {
    const shift = await this.shiftRepo.findOne({ where: { shift_id } });
    if (!shift) throw new NotFoundException('Shift tidak ditemukan');
    if (shift.status === 'closed') throw new BadRequestException('Shift sudah ditutup');

    const txResult = await this.txRepo
      .createQueryBuilder('tx')
      .select('COALESCE(SUM(tx.total), 0)', 'total_sales')
      .where('tx.store_id = :store_id', { store_id: shift.store_id })
      .andWhere('tx.created_at BETWEEN :opened AND NOW()', { opened: shift.opened_at })
      .andWhere('tx.status = :status', { status: 'paid' })
      .getRawOne();

    const cdResult = await this.cdTxRepo
      .createQueryBuilder('cd')
      .select('COALESCE(SUM(cd.amount), 0)', 'total_cd')
      .where('cd.shift_id = :shift_id', { shift_id })
      .getRawOne();

    const sales = parseFloat(txResult?.total_sales || '0');
    const cdAmount = parseFloat(cdResult?.total_cd || '0');
    const expected = parseFloat(String(shift.opening_balance)) + sales + cdAmount;
    const difference = dto.closing_balance - expected;

    await this.shiftRepo.update(shift_id, {
      closing_balance: dto.closing_balance,
      expected_balance: expected,
      difference,
      status: 'closed',
      notes: dto.notes || shift.notes,
      closed_at: new Date(),
    });

    return {
      success: true,
      shift_id,
      opening_balance: shift.opening_balance,
      total_sales: sales,
      closing_balance: dto.closing_balance,
      expected_balance: expected,
      difference,
      alert: Math.abs(difference) > 5000,
    };
  }

  async getHistory(store_id: string) {
    return this.shiftRepo.find({
      where: { store_id },
      order: { created_at: 'DESC' },
      take: 50,
    });
  }

  async pettyCash(shift_id: string, type: string, amount: number, reason: string, user_id: string) {
    const shift = await this.shiftRepo.findOne({ where: { shift_id, status: 'open' } });
    if (!shift) throw new NotFoundException('Shift aktif tidak ditemukan');
    const cdTx = this.cdTxRepo.create({ shift_id, type, amount: type === 'withdrawal' ? -Math.abs(amount) : Math.abs(amount), reason, user_id });
    await this.cdTxRepo.save(cdTx);
    return { success: true };
  }
}
