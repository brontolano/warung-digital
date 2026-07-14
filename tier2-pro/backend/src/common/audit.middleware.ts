import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditLogService } from './audit-log.service';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private audit: AuditLogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const originalJson = res.json.bind(res);
      res.json = function (body: any) {
        if (res.statusCode < 400 && body?.success !== false) {
          this.audit.log({
            action: `${req.method} ${req.path}`,
            entity_type: req.path.split('/').pop() || 'unknown',
            entity_id: req.params?.id || '',
            new_value: req.body || {},
            ip_address: req.ip,
          }).catch(() => {}); // fire and forget
        }
        return originalJson(body);
      }.bind(this);
    }
    next();
  }
}
