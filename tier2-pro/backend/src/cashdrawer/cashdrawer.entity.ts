import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { Store } from '../../auth/store.entity';
import { User } from '../../auth/user.entity';

@Entity('cashdrawer_shifts')
@Index(['store_id', 'created_at'])
export class CashdrawerShift {
  @PrimaryGeneratedColumn('uuid')
  shift_id: string;

  @Column() store_id: string;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ nullable: true }) user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'opening_balance', type: 'decimal', precision: 12, scale: 2, default: 0 })
  opening_balance: number;

  @Column({ name: 'closing_balance', type: 'decimal', precision: 12, scale: 2, nullable: true })
  closing_balance: number;

  @Column({ name: 'expected_balance', type: 'decimal', precision: 12, scale: 2, nullable: true })
  expected_balance: number;

  @Column({ name: 'difference', type: 'decimal', precision: 12, scale: 2, nullable: true })
  difference: number;

  @Column({ default: 'open' })
  status: string; // open, closed, verified

  @Column({ nullable: true })
  notes: string;

  @Column({ name: 'opened_at', type: 'timestamptz', default: () => 'NOW()' })
  opened_at: Date;

  @Column({ name: 'closed_at', type: 'timestamptz', nullable: true })
  closed_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}

@Entity('cashdrawer_transactions')
@Index(['shift_id'])
export class CashdrawerTransaction {
  @PrimaryGeneratedColumn('uuid')
  cd_transaction_id: string;

  @Column() shift_id: string;

  @ManyToOne(() => CashdrawerShift, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shift_id' })
  shift: CashdrawerShift;

  @Column()
  type: string; // top_up, withdrawal, petty_cash

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}

@Entity('shift_assignments')
export class ShiftAssignment {
  @PrimaryGeneratedColumn('uuid')
  assignment_id: string;

  @Column() user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  check_in: string;

  @Column({ nullable: true })
  check_out: string;
}
