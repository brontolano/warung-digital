import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './order.entity';
import { Product, PriceTier } from '../products/product.entity';

@Injectable()
export class StorefrontService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(PriceTier) private tierRepo: Repository<PriceTier>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
  ) {}

  async getStore(slug: string) {
    const products = await this.productRepo.find({ where: { is_active: true }, take: 1 });
    if (!products.length) throw new NotFoundException('Toko tidak ditemukan');
    return { slug, name: 'Den Ana Brontolano', store_id: 'default' };
  }

  async getProducts(slug: string) {
    return this.productRepo.find({ where: { is_active: true }, take: 50 });
  }

  async getPrice(slug: string, product_id: string, qty: number) {
    const product = await this.productRepo.findOne({ where: { product_id } });
    if (!product) throw new NotFoundException();
    const tiers = await this.tierRepo.find({ where: { product_id, is_active: true }, order: { min_qty: 'DESC' } });
    const tier = tiers.find(t => qty >= t.min_qty);
    const price = tier ? Number(tier.price) : Number(product.sell_price);
    return { name: product.name, qty, unit_price: price, tier: tier?.tier_name || 'HET', total: price * qty };
  }

  async checkout(slug: string, dto: any) {
    let total = 0;
    for (const item of dto.items) { const p = await this.getPrice(slug, item.product_id, item.qty); total += p.total; }
    const order = await this.orderRepo.save(this.orderRepo.create({ store_id: 'default', customer_name: dto.customer_name, total, order_status: 'pending' }));
    for (const item of dto.items) {
      const p = await this.getPrice(slug, item.product_id, item.qty);
      await this.itemRepo.save(this.itemRepo.create({ order_id: order.order_id, product_id: item.product_id, qty: item.qty, unit_price: p.unit_price, subtotal: p.total }));
    }
    return { success: true, order_id: order.order_id, total };
  }

  async trackOrder(wa: string) {
    return this.orderRepo.find({ where: { customer_wa: wa }, order: { created_at: 'DESC' } });
  }
}
