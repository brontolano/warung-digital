import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { ArApController } from './ar-ap.controller'; import { ArApService } from './ar-ap.service';
import { AccountsReceivable, AccountsPayable } from './ar-ap.entity';
@Module({ imports: [TypeOrmModule.forFeature([AccountsReceivable, AccountsPayable])], controllers: [ArApController], providers: [ArApService] })
export class ArApModule {}
