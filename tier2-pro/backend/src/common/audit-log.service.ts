import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  async log(params: { user_id?: string; action: string; entity_type: string; entity_id: string; old_value?: any; new_value?: any; ip_address?: string }) {
    return this.repo.save(this.repo.create({
      user_id: params.user_id || 'system',
      action: params.action,
      entity_type: params.entity_type,
      entity_id: params.entity_id,
      old_value: params.old_value ? JSON.stringify(params.old_value) : null,
      new_value: params.new_value ? JSON.stringify(params.new_value) : null,
      ip_address: params.ip_address || '',
    }));
  }

  async getByEntity(entity_type: string, entity_id: string) {
    return this.repo.find({ where: { entity_type, entity_id }, order: { created_at: 'DESC' }, take: 50 });
  }

  async getAll(page = 1, limit = 50) {
    const [data, total] = await this.repo.findAndCount({ order: { created_at: 'DESC' }, skip: (page - 1) * limit, take: limit });
    return { data, total, page, limit };
  }
}
