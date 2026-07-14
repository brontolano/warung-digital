import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid') product_id: string;
  @Column() store_id: string;
  @Column({ nullable: true }) barcode: string;
  @Column() name: string;
  @Column({ nullable: true }) description: string;
  @Column({ nullable: true }) category_id: string;
  @Column({ default: 'pcs' }) unit: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) purchase_price: number;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) sell_price: number;
  @Column({ type: 'int', default: 0 }) stock: number;
  @Column({ name: 'min_stock', type: 'int', default: 5 }) min_stock: number;
  @Column({ name: 'is_active', default: true }) is_active: boolean;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}

@Entity('price_tiers')
export class PriceTier {
  @PrimaryGeneratedColumn('uuid') tier_id: string;
  @Column() product_id: string;
  @Column({ length: 10 }) tier_name: string;
  @Column({ name: 'min_qty', type: 'int' }) min_qty: number;
  @Column({ type: 'decimal', precision: 12, scale: 2 }) price: number;
  @Column({ name: 'is_active', default: true }) is_active: boolean;
  @CreateDateColumn() created_at: Date;
}
