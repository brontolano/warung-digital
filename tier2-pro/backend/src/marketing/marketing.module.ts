import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingService } from './marketing.service'; import { MarketingController } from './marketing.controller';
import { LoyaltyPoint, StaffCommission, Promotion } from './marketing.entity';
@Module({ imports: [TypeOrmModule.forFeature([LoyaltyPoint, StaffCommission, Promotion])], controllers: [MarketingController], providers: [MarketingService] })
export class MarketingModule {}
