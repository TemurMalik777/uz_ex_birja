import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product_category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  create(createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryRepository.save(createProductCategoryDto);
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  findOne(id: number) {
    return this.productCategoryRepository.findOneBy({ id });
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    const updateProductCate = await this.productCategoryRepository.preload({ id, ...updateProductCategoryDto });
    if (!updateProductCate) {
      throw new NotFoundException(`ID topilmadi ${id}`)
    }
    return this.productCategoryRepository.save(updateProductCate);
  }

  remove(id: number) {
    return this.productCategoryRepository.delete({ id });
  }
}
