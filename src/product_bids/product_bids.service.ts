import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductBidDto } from './dto/create-product_bid.dto';
import { UpdateProductBidDto } from './dto/update-product_bid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductBid } from './entities/product_bid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductBidsService {
  constructor(
    @InjectRepository(ProductBid)
    private readonly productBid: Repository<ProductBid>,
  ) {}

  create(createProductBidDto: CreateProductBidDto) {
    return this.productBid.save(createProductBidDto);
  }

  findAll() {
    return this.productBid.find({ relations: ['product_id'] });
  }

  findOne(id: number) {
    return this.productBid.findOne({
      where: { id },
      relations: ['supplier_id'],
    });
  }

  async update(id: number, updateProductBidDto: UpdateProductBidDto) {
    const updateProductBid = await this.productBid.preload({
      id,
      ...updateProductBidDto,
    });
    if (!updateProductBid) {
      throw new NotFoundException(`ID topilmadi ${id}`);
    }
    return this.productBid.save(updateProductBid);
  }

  remove(id: number) {
    return this.productBid.delete({ id });
  }
}
