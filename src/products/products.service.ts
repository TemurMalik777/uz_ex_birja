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
