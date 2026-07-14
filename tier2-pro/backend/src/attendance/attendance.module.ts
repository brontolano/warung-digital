import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance, Shift } from './attendance.entity';
import { AttendanceController } from './attendance.controller';

@Module({ imports: [TypeOrmModule.forFeature([Attendance, Shift])], controllers: [AttendanceController] })
export class AttendanceModule {}
