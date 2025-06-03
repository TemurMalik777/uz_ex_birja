import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import { Field } from '@nestjs/graphql';
import { ProductImage } from '../../product_images/entities/product_image.entity';
import { ProductCategory } from '../../product_category/entities/product_category.entity';

@Entity('products_param')
export class ProductsParam {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @OneToOne(() => Product, (product) => product.productsParam)
  @JoinColumn({ name: 'product_id' }) // Ma'lumotlar bazasidagi ustun nomi
  products: Product;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Electronics', required: false })
  @IsOptional()
  @IsString()
  product_category: string;

  @Column({ name: 'Product (work/service)', nullable: true })
  @ApiProperty({ example: 'Repair service', required: false })
  @IsOptional()
  @IsString()
  product_work_service: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Samsung', required: false })
  @IsOptional()
  @IsString()
  manufacturer: string;

  @Column({ type: 'double precision', nullable: true })
  @ApiProperty({ example: 150.5, required: false })
  @IsOptional()
  @IsNumber()
  Quantity: number;

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ example: 299.99, required: false })
  @IsOptional()
  @IsNumber()
  price_per_unit: number;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ example: '2024-01-01', required: false })
  @IsOptional()
  @IsDateString()
  product_year: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ example: '2024-02-01', required: false })
  @IsOptional()
  @IsDateString()
  delivery_time: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'ISO 9001', required: false })
  @IsOptional()
  @IsString()
  certificate: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'High quality and durable.', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'South Korea', required: false })
  @IsOptional()
  @IsString()
  country_of_manufacture: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'image.jpg', required: false })
  @IsOptional()
  @IsString()
  product_image: string;

  @Column({ name: 'schotni tanlang', nullable: true })
  @ApiProperty({ example: 'Счет №12345', required: false })
  @IsOptional()
  @IsString()
  choose_schet: string;

  @Column({
    name: 'select platform',
    type: 'enum',
    enum: ['PlatformA', 'PlatformB'],
    nullable: true,
  })
  @ApiProperty({
    example: 'PlatformA',
    enum: ['PlatformA', 'PlatformB'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['PlatformA', 'PlatformB'])
  select_platform: string;

  @OneToMany(
    (type) => ProductImage,
    (productimagees) => productimagees.productimage_id,
  )
  @Field((type) => [ProductImage])
  productimagees: ProductImage[];

  @OneToMany((type)=>ProductCategory, (productcategryy)=>productcategryy.product_param_id)
  @Field((type)=>[ProductCategory])
  productcategryys: ProductCategory[]

}
