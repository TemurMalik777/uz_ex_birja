import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Holding {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 123, description: 'Order ID' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  order_id: number;

  @ApiProperty({ example: 456, description: 'Supplier ID' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  supplier_id: number;

  @ApiProperty({ example: '15000', description: 'Amount' })
  @IsString()
  @IsNotEmpty()
  @Column()
  amount: string;

  @ApiProperty({ example: 'pending', description: 'Status of the holding' })
  @IsString()
  @IsNotEmpty()
  @Column()
  status: string;
}
