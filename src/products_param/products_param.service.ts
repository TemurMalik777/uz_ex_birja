import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsParamDto } from './dto/create-products_param.dto';
import { UpdateProductsParamDto } from './dto/update-products_param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsParam } from './entities/products_param.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsParamService {
  constructor(
    @InjectRepository(ProductsParam)
    private readonly productParamRepo: Repository<ProductsParam>,
  ) {}

  create(createProductsParamDto: CreateProductsParamDto) {
    return this.productParamRepo.save(createProductsParamDto);
  }

  findAll() {
    return this.productParamRepo.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.productParamRepo.findOne({
      where: {id},
      relations: ['products']
    })
  }

  async update(id: number, updateProductsParamDto: UpdateProductsParamDto) {
    const updateProductParm = await this.productParamRepo.preload({ id, ...updateProductsParamDto });
    if (!updateProductParm) {
      throw new NotFoundException(`ID Toplimadi ${id}`)
    }
    return this.productParamRepo.save(updateProductParm)
  }

  remove(id: number) {
    return this.productParamRepo.delete({id})
  }
}
