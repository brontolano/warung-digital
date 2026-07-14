import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
@Entity('cashdrawer_shifts')
export class CashdrawerShift {
  @PrimaryGeneratedColumn('uuid') shift_id: string;
  @Column() store_id: string;
  @Column({ nullable: true }) user_id: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) opening_balance: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true }) closing_balance: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true }) expected_balance: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true }) difference: number;
  @Column({ default: 'open' }) status: string;
  @Column({ nullable: true }) notes: string;
  @CreateDateColumn() created_at: Date;
}
@Entity('cashdrawer_transactions')
export class CashdrawerTransaction {
  @PrimaryGeneratedColumn('uuid') cd_transaction_id: string;
  @Column() shift_id: string;
  @Column() type: string;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) amount: number;
  @Column({ nullable: true }) reason: string;
  @Column({ nullable: true }) user_id: string;
}
