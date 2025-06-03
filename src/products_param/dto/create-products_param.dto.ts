import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products_param')
export class CreateProductsParamDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  producttt_id: number;

  @Column({ nullable: true })
  product_category: string;

  @Column({ name: 'Product (work/service)', nullable: true })
  product_work_service: string;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ type: 'double precision', nullable: true })
  Quantity: number;

  @Column({ type: 'decimal', nullable: true })
  price_per_unit: number;

  @Column({ type: 'date', nullable: true })
  product_year: string;

  @Column({ type: 'date', nullable: true })
  delivery_time: string;

  @Column({ nullable: true })
  certificate: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  country_of_manufacture: string;

  @Column({ nullable: true })
  product_image: string;

  @Column({ name: 'schotni tanlang', nullable: true })
  choose_schet: string;

  @Column({
    name: 'select platform',
    type: 'enum',
    enum: ['PlatformA', 'PlatformB'],
    nullable: true,
  })
  select_platform: string;
}
