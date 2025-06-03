import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product_image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly imageRpo: Repository<ProductImage>,
  ) {}

  create(createProductImageDto: CreateProductImageDto) {
    return this.imageRpo.save(createProductImageDto);
  }

  findAll() {
    return this.imageRpo.find({ relations: ['productimage_id'] });
  }

  findOne(id: number) {
    return this.imageRpo.findOne({
      where: { id },
      relations: ['productimage_id'],
    });
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDto) {
    const updateProdImage = await this.imageRpo.preload({
      id,
      ...updateProductImageDto,
    });
    if (!updateProdImage) {
      throw new NotFoundException(`Id topilmadi ${id}`);
    }
    return this.imageRpo.save(updateProdImage);
  }

  remove(id: number) {
    return this.imageRpo.delete({ id });
  }
}
