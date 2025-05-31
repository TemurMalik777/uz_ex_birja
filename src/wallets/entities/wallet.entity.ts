import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsPositive,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Field } from '@nestjs/graphql';

@Entity('wallets')
export class Wallet {
  @ApiProperty({ example: 1, description: 'Hamyon ID si' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID si' })
  @IsInt()
  @IsNotEmpty()
  @Column()
  @ManyToOne((type) => User, (userId) => userId.wallets)
  @Field((type) => Wallet)
  userId: number;

  @ApiProperty({ example: 100000, description: 'Hamyon balansi' })
  @IsInt()
  @IsPositive()
  @Column('int', { default: 0 })
  balance: number;

  @ApiProperty({ example: 'UZS', description: 'Valyuta kodi' })
  @IsString()
  @IsNotEmpty()
  @Column()
  locked_balance: string;
}
