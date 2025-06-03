import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Field } from '@nestjs/graphql';

@Entity('product_bids')
export class ProductBid {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Product, (product_id) => product_id.productbids)
  @Field((type) => ProductBid)
  @ApiProperty({ example: 1, description: 'Mahsulot ID raqami' })
  @IsNumber()
  product_id: number;

  @ManyToOne((type) => Product, (product_id) => product_id.productbids)
  @Field((type) => ProductBid)
  @ApiProperty({ example: 2, description: 'Yetkazib beruvchi ID raqami' })
  @IsNumber()
  supplier_id: number;

  @ApiProperty({ example: 150000, description: 'Taklif narxi' })
  @IsNumber()
  @IsPositive()
  bid_price: number;
}
