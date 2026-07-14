import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
@Entity('orders')
export class Order { @PrimaryGeneratedColumn('uuid') order_id: string; @Column() store_id: string; @Column() customer_name: string; @Column({ nullable: true }) customer_wa: string; @Column({ nullable: true }) delivery_address: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 }) total: number; @Column({ default: 'pending' }) order_status: string; @Column({ nullable: true }) notes: string; @CreateDateColumn() created_at: Date; }
@Entity('order_items')
export class OrderItem { @PrimaryGeneratedColumn('uuid') order_item_id: string; @Column() order_id: string; @Column() product_id: string; @Column({ length: 10, default: 'HET' }) tier_name: string;
  @Column({ type: 'int' }) qty: number; @Column({ type: 'decimal', precision: 12, scale: 2 }) unit_price: number; @Column({ type: 'decimal', precision: 12, scale: 2 }) subtotal: number; }
