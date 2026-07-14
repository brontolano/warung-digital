import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AuditModule } from './common/audit.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PosModule } from './pos/pos.module';
import { CashdrawerModule } from './cashdrawer/cashdrawer.module';
import { ArApModule } from './ar-ap/ar-ap.module';
import { StockModule } from './stock/stock.module';
import { MarketingModule } from './marketing/marketing.module';
import { AttendanceModule } from './attendance/attendance.module';
import { StorefrontModule } from './storefront/storefront.module';
import { ReportsModule } from './reports/reports.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('DB_HOST', 'localhost'),
        port: cs.get('DB_PORT', 5432),
        username: cs.get('DB_USER', 'postgres'),
        password: cs.get('DB_PASSWORD', 'postgres'),
        database: cs.get('DB_NAME', 'warung_digital'),
        autoLoadEntities: true,
        synchronize: cs.get('NODE_ENV') === 'development',
        logging: cs.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    AuditModule,
    AuthModule,
    ProductsModule,
    PosModule,
    CashdrawerModule,
    ArApModule,
    StockModule,
    MarketingModule,
    AttendanceModule,
    StorefrontModule,
    ReportsModule,
    WebhooksModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
