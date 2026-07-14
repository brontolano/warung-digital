import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance, Shift } from './attendance.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('v1/attendance')
export class AttendanceController {
  constructor(
    @InjectRepository(Attendance) private repo: Repository<Attendance>,
    @InjectRepository(Shift) private shiftRepo: Repository<Shift>,
  ) {}

  @Post('checkin')
  async checkin(@Body() dto: { store_id: string; user_id: string; shift_name?: string }) {
    const existing = await this.repo.findOne({ where: { store_id: dto.store_id, user_id: dto.user_id, date: new Date() } });
    if (existing) return { success: false, error: 'Sudah check-in hari ini' };
    return this.repo.save(this.repo.create({
      store_id: dto.store_id, user_id: dto.user_id, date: new Date(),
      check_in: new Date().toTimeString().substring(0, 5),
      status: 'present', notes: dto.shift_name || ''
    }));
  }

  @Post('checkout')
  async checkout(@Body() dto: { store_id: string; user_id: string }) {
    const att = await this.repo.findOne({ where: { store_id: dto.store_id, user_id: dto.user_id, date: new Date() } });
    if (!att) return { success: false, error: 'Belum check-in' };
    if (att.check_out) return { success: false, error: 'Sudah check-out hari ini' };
    await this.repo.update(att.attendance_id, { check_out: new Date().toTimeString().substring(0, 5) });
    return { success: true };
  }

  @Get()
  async list(@Query('store_id') sid: string, @Query('user_id') uid: string, @Query('month') month: number, @Query('year') year: number) {
    const qb = this.repo.createQueryBuilder('a').where('a.store_id = :sid', { sid });
    if (uid) qb.andWhere('a.user_id = :uid', { uid });
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);
      qb.andWhere('a.date BETWEEN :start AND :end', { start, end });
    }
    return qb.orderBy('a.date', 'DESC').getMany();
  }
}
