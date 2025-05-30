import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsNumberString } from 'class-validator';

@Entity()
export class Order {
  @ApiProperty({ example: 1, description: 'Unique order ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 101, description: 'ID of the product being ordered' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  product_id: number;

  @ApiProperty({ example: 3, description: 'Quantity of the product ordered' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  quantity: number;

  @ApiProperty({
    example: '15000.00',
    description: 'Total price for the order',
  })
  @IsNumberString()
  @IsNotEmpty()
  @Column()
  total_price: string;

  @ApiProperty({ example: 'pending', description: 'Status of the order' })
  @IsString()
  @IsNotEmpty()
  @Column()
  status: string;
}
