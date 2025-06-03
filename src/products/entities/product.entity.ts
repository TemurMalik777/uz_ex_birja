import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Field } from '@nestjs/graphql';
import { ProductBid } from '../../product_bids/entities/product_bid.entity';
import { ProductsParam } from '../../products_param/entities/products_param.entity';
import { ProductImage } from '../../product_images/entities/product_image.entity';
import { AdminReview } from '../../amin_reviws/entities/admin_reviw.entity';
import { Complaint } from '../../complaints/entities/complaint.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique ID of the product' })
  id: number;

  @ManyToOne((type) => User, (supplier_id) => supplier_id.products)
  @Field((type) => Product)
  @ApiProperty({ example: 5, description: 'ID of the supplier' })
  supplier_id: number;

  @Column()
  @ApiProperty({ example: 2, description: 'ID of the category' })
  category_id: number;

  @Column()
  @ApiProperty({ example: 'PENDING', description: 'Status of the product' })
  status: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Image is blurry',
    description: 'Reason for rejection (optional)',
  })
  rejection_reason: string;

  @OneToMany((type) => ProductBid, (product) => product.product_id)
  @Field((type) => [ProductBid])
  products: ProductBid[];

  @OneToMany((type) => ProductBid, (product) => product.product_id)
  @Field((type) => [ProductBid])
  productbids: ProductBid[];

  // @OneToOne(
  //   (type) => ProductsParam,
  //   (productsparam) => productsparam.producttt_id,
  // )
  // @Field((type) => [ProductsParam])
  // productsparams: ProductsParam[];
  @OneToOne(() => ProductsParam, (productsParam) => productsParam.products)
  productsParam: ProductsParam;

  @OneToMany(
    (type) => ProductImage,
    (product_image) => product_image.productimage_id,
  )
  @Field((type) => [ProductImage])
  prodiamges: ProductImage[];

  @OneToMany(
    (type) => AdminReview,
    (admin_reviews) => admin_reviews.product_id,
    { cascade: true },
  )
  admin_reviews: AdminReview[];


  @OneToMany(()=>Complaint, (user_product)=>user_product.product_id)
  user_product: Complaint[]
}
