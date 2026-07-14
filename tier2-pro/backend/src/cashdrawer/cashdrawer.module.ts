import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { CashdrawerController } from './cashdrawer.controller'; import { CashdrawerService } from './cashdrawer.service';
import { CashdrawerShift, CashdrawerTransaction } from './cashdrawer.entity';
@Module({ imports: [TypeOrmModule.forFeature([CashdrawerShift, CashdrawerTransaction])], controllers: [CashdrawerController], providers: [CashdrawerService] })
export class CashdrawerModule {}
