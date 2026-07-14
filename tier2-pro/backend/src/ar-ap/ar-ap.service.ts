import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsReceivable, AccountsPayable } from './ar-ap.entity';

@Injectable()
export class ArApService {
  constructor(@InjectRepository(AccountsReceivable) private arRepo: Repository<AccountsReceivable>, @InjectRepository(AccountsPayable) private apRepo: Repository<AccountsPayable>) {}

  async createAr(dto: any) { return this.arRepo.save(this.arRepo.create(dto)); }
  async getAr(store_id: string) { return this.arRepo.find({ where: { store_id }, order: { due_date: 'ASC' } }); }
  async payAr(ar_id: string, amount: number) {
    const ar = await this.arRepo.findOne({ where: { ar_id } }); if (!ar) throw new NotFoundException();
    if (ar.paid_amount + amount > ar.total_amount) throw new BadRequestException('Melebihi total');
    ar.paid_amount = Number(ar.paid_amount) + amount;
    ar.status = ar.paid_amount >= ar.total_amount ? 'paid' : 'active';
    return this.arRepo.save(ar);
  }
  async createAp(dto: any) { return this.apRepo.save(this.apRepo.create(dto)); }
  async getAp(store_id: string) { return this.apRepo.find({ where: { store_id }, order: { due_date: 'ASC' } }); }
  async payAp(ap_id: string, amount: number) {
    const ap = await this.apRepo.findOne({ where: { ap_id } }); if (!ap) throw new NotFoundException();
    if (ap.paid_amount + amount > ap.total_amount) throw new BadRequestException('Melebihi total');
    ap.paid_amount = Number(ap.paid_amount) + amount;
    ap.status = ap.paid_amount >= ap.total_amount ? 'paid' : 'active';
    return this.apRepo.save(ap);
  }
}
