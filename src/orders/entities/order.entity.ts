import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsNumberString } from 'class-validator';
import { Holding } from '../../holdings/entities/holding.entity';
import { Field } from '@nestjs/graphql';
import { OrderLog } from '../../order_logs/entities/order_log.entity';
import { User } from '../../users/entities/user.entity';

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

  @ManyToOne((type)=>User, (client_id)=>client_id.orders)
  @Field((type)=>Order)
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Column()
  client_id: number;

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

  @OneToMany((type) => Holding, (holdingorder) => holdingorder.order_id)
  @Field((type) => [Holding])
  holdingorders: Holding[];

  @OneToMany((type) => OrderLog, (orderlog) => orderlog.orderasid)
  @Field((type) => [OrderLog])
  orderlogs: OrderLog[];
}
