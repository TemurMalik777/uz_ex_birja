import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  //=================Query================
  async getCheapestProducts() {
    return this.productRepo
      .createQueryBuilder('product')
      .leftJoin('product.product_param', 'param')
      .leftJoin('product.product_bids', 'bid')
      .leftJoin('param.product_category', 'category')
      .leftJoin('product.supplier', 'supplier')
      .leftJoin('product.product_images', 'images')
      .where('bid.bid_price IS NOT NULL')
      .select([
        'product.id AS product_id',
        'param."Product (work/service)" AS name',
        'param.price_per_unit AS unit_price',
        'category.name AS category_name',
        'supplier.company_name AS supplier',
        'images.image_url AS image',
        'MIN(bid.bid_price) AS min_price',
      ])
      .groupBy(
        'product.id, param.id, category.name, supplier.company_name, images.image_url',
      )
      .orderBy('min_price', 'ASC')
      .limit(10)
      .getRawMany();
  }
  //=========================================

  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  findAll() {
    return this.productRepo.find({ relations: ['supplier_id'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['supplier_id'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProdcuts = await this.productRepo.preload({
      id,
      ...updateProductDto,
    });
    if (!updateProdcuts) {
      throw new NotFoundException(`ID topilmadi`);
    }
    return this.productRepo.save(updateProdcuts);
  }

  remove(id: number) {
    return this.productRepo.delete({ id });
  }
}
