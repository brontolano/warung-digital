import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
@Entity('loyalty_points')
export class LoyaltyPoint {
  @PrimaryGeneratedColumn('uuid') loyalty_id: string; @Column() store_id: string; @Column() customer_name: string; @Column({ nullable: true }) customer_wa: string;
  @Column({ type: 'int', default: 0 }) points: number; @Column({ type: 'int', default: 0 }) lifetime_points: number; @CreateDateColumn() created_at: Date;
}
@Entity('staff_commissions')
export class StaffCommission {
  @PrimaryGeneratedColumn('uuid') commission_id: string; @Column() store_id: string; @Column() user_id: string; @Column({ nullable: true }) transaction_id: string;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 }) commission_percent: number; @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) commission_amount: number;
  @Column({ default: 'pending' }) status: string; @CreateDateColumn() created_at: Date;
}
@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn('uuid') promotion_id: string; @Column() store_id: string; @Column() name: string; @Column() type: string; @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) value: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) min_purchase: number; @Column({ type: 'date', nullable: true }) start_date: Date; @Column({ type: 'date', nullable: true }) end_date: Date;
  @Column({ default: true }) is_active: boolean; @CreateDateColumn() created_at: Date;
}
