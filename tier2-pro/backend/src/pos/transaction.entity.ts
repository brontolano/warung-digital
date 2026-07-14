import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid') transaction_id: string;
  @Column() store_id: string;
  @Column({ nullable: true }) user_id: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) total: number;
  @Column({ default: 'cash' }) payment_method: string;
  @Column({ default: 'paid' }) status: string;
  @Column({ nullable: true }) notes: string;
  @CreateDateColumn() created_at: Date;
}
@Entity('transaction_items')
export class TransactionItem {
  @PrimaryGeneratedColumn('uuid') item_id: string;
  @Column() transaction_id: string;
  @Column() product_id: string;
  @Column({ type: 'int' }) qty: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) unit_price: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) subtotal: number;
  @Column({ length: 10, default: 'HET' }) tier_name: string;
}
