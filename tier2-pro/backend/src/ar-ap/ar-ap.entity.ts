import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Store } from '../../auth/store.entity';
import { User } from '../../auth/user.entity';

@Entity('accounts_receivable')
@Index(['store_id', 'due_date'])
@Index(['customer_wa'])
export class AccountsReceivable {
  @PrimaryGeneratedColumn('uuid')
  ar_id: string;

  @Column() store_id: string;

  @Column({ nullable: true }) customer_name: string;
  @Column({ nullable: true }) customer_wa: string;
  @Column({ nullable: true }) invoice_number: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) total_amount: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) paid_amount: number;
  @Column({ type: 'date' }) due_date: Date;
  @Column({ default: 'active' }) status: string; // active, overdue, paid, written_off
  @Column({ nullable: true }) notes: string;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}

@Entity('accounts_payable')
@Index(['store_id', 'due_date'])
@Index(['vendor_name'])
export class AccountsPayable {
  @PrimaryGeneratedColumn('uuid')
  ap_id: string;

  @Column() store_id: string;
  @Column() vendor_name: string;
  @Column({ nullable: true }) vendor_wa: string;
  @Column({ nullable: true }) invoice_number: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) total_amount: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) paid_amount: number;
  @Column({ type: 'date' }) due_date: Date;
  @Column({ default: 'active' }) status: string; // active, overdue, paid
  @Column({ nullable: true }) notes: string;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}