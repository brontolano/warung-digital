import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('stock_opname')
export class StockOpname {
  @PrimaryGeneratedColumn('uuid') opname_id: string;
  @Column() store_id: string;
  @Column({ nullable: true }) user_id: string;
  @Column({ nullable: true }) notes: string;
  @Column({ default: 'draft' }) status: string;
  @CreateDateColumn() created_at: Date;
  @Column({ nullable: true }) completed_at: Date;
}

@Entity('stock_opname_items')
export class StockOpnameItem {
  @PrimaryGeneratedColumn('uuid') opname_item_id: string;
  @Column() opname_id: string;
  @Column() product_id: string;
  @Column({ type: 'int', default: 0 }) system_stock: number;
  @Column({ type: 'int', default: 0 }) physical_stock: number;
  @Column({ type: 'int', default: 0 }) difference: number;
  @Column({ nullable: true }) notes: string;
}
