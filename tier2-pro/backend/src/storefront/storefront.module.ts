import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { StorefrontController } from './storefront.controller'; import { StorefrontService } from './storefront.service';
import { Order, OrderItem } from './order.entity'; import { Product, PriceTier } from '../products/product.entity';

@Module({ imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, PriceTier])], controllers: [StorefrontController], providers: [StorefrontService] })
export class StorefrontModule {}
