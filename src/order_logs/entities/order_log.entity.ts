import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class OrderLog {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 123, description: 'Order ID' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  order_id: number;

  @ApiProperty({ example: 'shipped', description: 'Order status' })
  @IsString()
  @IsNotEmpty()
  @Column()
  status: string;
}
