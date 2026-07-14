import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashdrawerShift, CashdrawerTransaction } from './cashdrawer.entity';

@Injectable()
export class CashdrawerService {
  constructor(@InjectRepository(CashdrawerShift) private shiftRepo: Repository<CashdrawerShift>, @InjectRepository(CashdrawerTransaction) private cdRepo: Repository<CashdrawerTransaction>) {}

  async open(dto: any, user_id: string) {
    const open = await this.shiftRepo.findOne({ where: { store_id: dto.store_id, status: 'open' } });
    if (open) throw new BadRequestException('Shift masih ada yang buka');
    return this.shiftRepo.save(this.shiftRepo.create({ store_id: dto.store_id, user_id, opening_balance: dto.opening_balance || 0, status: 'open' }));
  }

  async close(shift_id: string, dto: any) {
    const shift = await this.shiftRepo.findOne({ where: { shift_id } });
    if (!shift) throw new NotFoundException('Shift tidak ditemukan');
    const expected = Number(shift.opening_balance) + (dto.total_sales || 0);
    const diff = dto.closing_balance - expected;
    await this.shiftRepo.update(shift_id, { closing_balance: dto.closing_balance, expected_balance: expected, difference: diff, status: 'closed' });
    return { success: true, difference: diff, alert: Math.abs(diff) > 5000 };
  }

  async history(store_id: string) { return this.shiftRepo.find({ where: { store_id }, order: { created_at: 'DESC' }, take: 50 }); }
}
