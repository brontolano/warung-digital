import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('attendance')
@Index(['store_id', 'user_id', 'date'], { unique: true })
export class Attendance {
  @PrimaryGeneratedColumn('uuid') attendance_id: string;
  @Column() store_id: string;
  @Column() user_id: string;
  @Column({ type: 'date' }) date: Date;
  @Column({ nullable: true }) check_in: string;
  @Column({ nullable: true }) check_out: string;
  @Column({ default: 'present' }) status: string;
  @Column({ nullable: true }) notes: string;
  @CreateDateColumn() created_at: Date;
}

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn('uuid') shift_id: string;
  @Column() store_id: string;
  @Column() name: string;
  @Column({ nullable: true }) start_time: string;
  @Column({ nullable: true }) end_time: string;
  @Column({ default: true }) is_active: boolean;
}
