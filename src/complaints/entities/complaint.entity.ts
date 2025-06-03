import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity()
export class Complaint {
  @ApiProperty({ example: 1, description: 'Complaint ID' })
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne((type) => User, (complainant_id) => complainant_id.complaints)
  @Field((type) => Complaint)
  @ApiProperty({ example: 101, description: 'ID of user making the complaint' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  complainant_id: number;

  @ApiProperty({
    example: 'This product was fake.',
    description: 'Complaint message',
  })
  @IsString()
  @IsNotEmpty()
  @Field()
  @Column()
  message: string;

  @ApiProperty({ example: 'pending', description: 'Status of the complaint' })
  @IsString()
  @IsNotEmpty()
  @Field()
  @Column()
  status: string;

  @ManyToOne(() => User, (against_user_id) => against_user_id.complaint_user)
  against_user_id: User;

  @ManyToOne(() => Product, (product_id) => product_id.user_product)
  product_id: Product;
}
