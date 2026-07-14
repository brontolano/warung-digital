import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
@Entity('accounts_receivable')
export class AccountsReceivable {
  @PrimaryGeneratedColumn('uuid') ar_id: string; @Column() store_id: string; @Column() customer_name: string; @Column({ nullable: true }) customer_wa: string; @Column({ nullable: true }) invoice_number: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) total_amount: number; @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) paid_amount: number; @Column({ type: 'date' }) due_date: Date;
  @Column({ default: 'active' }) status: string; @Column({ nullable: true }) notes: string; @CreateDateColumn() created_at: Date;
}
@Entity('accounts_payable')
export class AccountsPayable {
  @PrimaryGeneratedColumn('uuid') ap_id: string; @Column() store_id: string; @Column() vendor_name: string; @Column({ nullable: true }) vendor_wa: string; @Column({ nullable: true }) invoice_number: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) total_amount: number; @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) paid_amount: number; @Column({ type: 'date' }) due_date: Date;
  @Column({ default: 'active' }) status: string; @Column({ nullable: true }) notes: string; @CreateDateColumn() created_at: Date;
}
