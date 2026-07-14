import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, PriceTier } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>, @InjectRepository(PriceTier) private tierRepo: Repository<PriceTier>) {}

  async findAll(store_id: string) { return this.productRepo.find({ where: { store_id, is_active: true } }); }

  async findOne(product_id: string) {
    const product = await this.productRepo.findOne({ where: { product_id } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    const tiers = await this.tierRepo.find({ where: { product_id }, order: { min_qty: 'ASC' } });
    return { ...product, tiers };
  }

  async create(store_id: string, data: any) { return this.productRepo.save(this.productRepo.create({ store_id, ...data })); }

  async update(product_id: string, data: any) {
    await this.productRepo.findOne({ where: { product_id } }).then(p => { if (!p) throw new NotFoundException(); });
    await this.productRepo.update(product_id, data);
    return this.findOne(product_id);
  }

  async delete(product_id: string) { await this.productRepo.update(product_id, { is_active: false }); return { success: true }; }

  async addTier(product_id: string, tierName: string, minQty: number, price: number) {
    const existing = await this.tierRepo.findOne({ where: { product_id, tier_name: tierName } });
    if (existing) throw new ConflictException('Tier ' + tierName + ' sudah ada');
    return this.tierRepo.save(this.tierRepo.create({ product_id, tier_name: tierName, min_qty: minQty, price }));
  }

  async getPrice(product_id: string, qty: number) {
    const tiers = await this.tierRepo.find({ where: { product_id, is_active: true }, order: { min_qty: 'DESC' } });
    const product = await this.productRepo.findOne({ where: { product_id } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    const tier = tiers.find(t => qty >= t.min_qty);
    const price = tier ? Number(tier.price) : Number(product.sell_price);
    return { product_id, name: product.name, qty, unit_price: price, tier: tier?.tier_name || 'HET', total: price * qty };
  }
}
