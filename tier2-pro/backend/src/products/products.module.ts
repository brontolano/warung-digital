import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, PriceTier } from './product.entity';

@Module({ imports: [TypeOrmModule.forFeature([Product, PriceTier])], controllers: [ProductsController], providers: [ProductsService], exports: [ProductsService] })
export class ProductsModule {}
