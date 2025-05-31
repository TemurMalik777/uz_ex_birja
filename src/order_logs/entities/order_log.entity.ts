import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';
import { Field } from '@nestjs/graphql';

@Entity()
export class OrderLog {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Order, (orderasid) => orderasid.orderlogs)
  @Field((type) => OrderLog)
  @ApiProperty({ example: 123, description: 'Order ID' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  orderasid: number;

  @ApiProperty({ example: 'shipped', description: 'Order status' })
  @IsString()
  @IsNotEmpty()
  @Column()
  status: string;
}
