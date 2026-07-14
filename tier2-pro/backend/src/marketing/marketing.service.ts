import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyPoint, StaffCommission } from './marketing.entity';

@Injectable()
export class MarketingService {
  constructor(@InjectRepository(LoyaltyPoint) private lpRepo: Repository<LoyaltyPoint>, @InjectRepository(StaffCommission) private scRepo: Repository<StaffCommission>) {}
  async cekPoin(wa: string) { return this.lpRepo.findOne({ where: { customer_wa: wa } }); }
  async redeem(dto: any) { /* Implementasi redeem logic */ return { success: true }; }
  async komisi(store_id: string) { return this.scRepo.find({ where: { store_id } }); }
}
