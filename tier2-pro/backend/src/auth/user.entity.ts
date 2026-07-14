import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') user_id: string;
  @Column({ unique: true }) email: string;
  @Column({ select: false }) password_hash: string;
  @Column() nama_warung: string;
  @Column() nama_pemilik: string;
  @Column({ nullable: true }) no_wa: string;
  @Column({ default: 'owner' }) role: string;
  @Column({ default: 'pro' }) subscription_tier: string;
  @CreateDateColumn({ name: 'created_at' }) created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updated_at: Date;
  @Column({ name: 'is_active', default: true }) is_active: boolean;
}
