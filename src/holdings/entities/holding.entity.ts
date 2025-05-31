import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Field } from '@nestjs/graphql';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Holding {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type)=>Order, (order_id)=>order_id.holdingorders)
  @Field((type)=>Order)
  @ApiProperty({ example: 123, description: 'Order ID' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  order_id: number;

  @ManyToOne((type) => User, (supplier) => supplier.holdings)
  @Field((type) => Holding)
  @ApiProperty({ example: 456, description: 'Supplier ID' })
  @IsInt()
  @IsNotEmpty()
  supplier: number;

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
