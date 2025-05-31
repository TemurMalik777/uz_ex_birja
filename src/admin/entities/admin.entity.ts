import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
@Entity()
export class Admin {
  @ApiProperty({ example: 1 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ali Valiyev' })
  @Field()
  @Column()
  fullName: string;

  @ApiProperty({ example: 'ali123' })
  @Field()
  @Column()
  username: string;

  @ApiProperty({ example: 'ali@example.com' })
  @Field()
  @Column()
  email: string;

  @ApiProperty({ example: '$2b$10$hashedPasswordString' })
  @Field()
  @Column()
  hashed_password: string;

  @ApiProperty({ example: 'true' })
  @Field()
  @Column({ default: false })
  is_creator: string;

  @ApiProperty()
  @Field()
  @Column({ nullable: true })
  is_active?: string;

  @ApiProperty({ example: 'some-refresh-token', required: false })
  @Field()
  @Column()
  refresh_token?: string;

  @ApiProperty({ example: '+998901234567' })
  @Field()
  @Column()
  phone: string;
}
