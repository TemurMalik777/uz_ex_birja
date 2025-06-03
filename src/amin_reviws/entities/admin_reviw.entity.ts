import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Admin } from 'src/admin/entities/admin.entity';
import { Field } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';

@Entity('admin_reviews')
export class AdminReview {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique ID of the admin review' })
  id: number;

  @ManyToOne((type) => Admin, (admin) => admin.adminreviews)
  @Field((type) => AdminReview)
  @ApiProperty({
    example: 3,
    description: 'ID of the admin who wrote the review',
  })
  admin_id: number;

  //   @ManyToOne(() => product, { onDelete: 'CASCADE' })
  //   @JoinColumn({ name: 'product_id' })
  // product: number;

  @Column()
  @ApiProperty({ example: 'APPROVED', description: 'Status of the review' })
  status: string;

  @Column()
  @ApiProperty({
    example: 'Checked all quality metrics',
    description: 'Comment by the admin',
  })
  comment: string;

  @Column()
  @ApiProperty({ example: 'QUALITY_CHECK', description: 'Type of the review' })
  review_type: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2025-05-31T15:00:00Z',
    description: 'Review creation timestamp',
  })
  created_at: Date;

  @Column()
  @ApiProperty({ example: 10, description: 'ID of the product being reviewed' })
  @ManyToOne(() => Product, (product_id) => product_id.admin_reviews)
  product_id: number;
}
