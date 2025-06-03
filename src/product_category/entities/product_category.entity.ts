import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsParam } from '../../products_param/entities/products_param.entity';

@Entity('product-category')
export class ProductCategory {
  @ApiProperty({ example: 1, description: 'Product category ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @Column()
  name: string;

  @ManyToOne((type)=>ProductsParam, (product_param_id)=>product_param_id.productcategryys)
  @ApiProperty({ example: 10, description: 'Related product parameter ID' })
  @Column()
  product_param_id: number;
}
