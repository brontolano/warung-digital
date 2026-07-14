import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('audit_logs')
@Index(['entity_type', 'entity_id'])
@Index(['user_id'])
export class AuditLog {
  @PrimaryGeneratedColumn('uuid') log_id: string;
  @Column() user_id: string;
  @Column() action: string;
  @Column({ name: 'entity_type' }) entity_type: string;
  @Column({ name: 'entity_id' }) entity_id: string;
  @Column({ type: 'text', nullable: true }) old_value: string;
  @Column({ type: 'text', nullable: true }) new_value: string;
  @Column({ nullable: true }) ip_address: string;
  @CreateDateColumn({ name: 'created_at' }) created_at: Date;
}
