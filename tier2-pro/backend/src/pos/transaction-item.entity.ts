import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { Store } from '../../auth/store.entity';
import { User } from '../../auth/user.entity';

@Entity('transaction_items')
@Index(['transaction_id'])
@Index(['product_id'])
export class TransactionItem {
  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @Column({ name: 'transaction_id' })
  transaction_id: string;

  @ManyToOne(() => Transaction, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @Column({ name: 'product_id' })
  product_id: string;

  @Column({ name: 'tier_name', default: 'HET', length: 10 })
  tier_name: string;

  @Column({ type: 'int', default: 1 })
  qty: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  unit_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  subtotal: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}

// Re-export from pos module
import { Transaction } from './transaction.entity';
