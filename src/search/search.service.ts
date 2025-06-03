import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductsParam } from '../products_param/entities/products_param.entity';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { ProductBid } from '../product_bids/entities/product_bid.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(ProductsParam)
    private productParamRepo: Repository<ProductsParam>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(ProductBid)
    private bidRepo: Repository<ProductBid>,
  ) {}

  async searchProductsByName(searchText: string) {
    return this.productParamRepo
      .createQueryBuilder('param') // <-- to‘g‘ri nom
      .where('param.product_work_service ILIKE :text', {
        text: `%${searchText}%`,
      })
      .getMany();
  }

  async searchUsersByName(keyword: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.full_name ILIKE :k OR user.company_name ILIKE :k', {
        k: `%${keyword}%`,
      })
      .getMany();
  }

  async searchOrders(clientId: number, productName: string) {
    return this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoinAndSelect('product.product_param', 'param')
      .where('order.client_id = :clientId', { clientId })
      .andWhere('param."Product (work/service)" ILIKE :productName', {
        productName: `%${productName}%`,
      })
      .getMany();
  }

  async rejectedProducts() {
    return this.productRepo
      .createQueryBuilder('product')
      .where('product.status = :status', { status: 'rejected' })
      .select(['product.id', 'product.rejection_reason'])
      .getMany();
  }

  async searchBidsByPrice(min: number, max: number) {
    return this.bidRepo
      .createQueryBuilder('bid')
      .leftJoinAndSelect('bid.product', 'product')
      .where('bid.bid_price BETWEEN :min AND :max', { min, max })
      .getMany();
  }
  //==========================================================
  // search.service.ts

  async searchLowestBidProducts() {
    return this.productRepo
      .createQueryBuilder('product')
      .leftJoin('product.product_param', 'param')
      .leftJoin('product.product_bids', 'bid')
      .leftJoin('param.product_category', 'category')
      .leftJoin('product.supplier', 'supplier')
      .leftJoin('product.product_images', 'images')
      .where('bid.bid_price IS NOT NULL')
      .select([
        'product.id',
        'param."Product (work/service)"',
        'param.price_per_unit',
        'category.name',
        'supplier.company_name',
        'images.image_url',
        'MIN(bid.bid_price) as min_bid_price',
      ])
      .groupBy(
        'product.id, param.id, category.name, supplier.company_name, images.image_url',
      )
      .orderBy('min_bid_price', 'ASC')
      .limit(10)
      .getRawMany();
  }
}
