import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Complaint {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Complaint ID' })
  id: number;

  @Field(() => Int)
  @Column()
  @ApiProperty({ example: 123, description: 'Complainant user ID' })
  complainant_id: number;

  @Field(() => Int)
  @Column()
  @ApiProperty({
    example: 456,
    description: 'Against user ID (kimga shikoyat)',
  })
  against_user_id: number;

  @Field(() => Int)
  @Column()
  @ApiProperty({ example: 789, description: 'Mahsulot ID' })
  product_id: number;

  @Field()
  @Column()
  @ApiProperty({
    example: 'Bu foydalanuvchi mahsulotni noto‘g‘ri yetkazdi',
    description: 'Shikoyat matni',
  })
  message: string;

  @Field()
  @Column({ default: 'pending' })
  @ApiProperty({
    example: 'pending',
    description: 'Shikoyat holati (pending, resolved, rejected)',
  })
  status: string;
}
