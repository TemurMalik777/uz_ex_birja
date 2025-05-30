import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsPositive,
} from 'class-validator';

@Entity('wallets')
export class Wallet {
  @ApiProperty({ example: 1, description: 'Hamyon ID si' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID si' })
  @IsInt()
  @IsNotEmpty()
  @Column()
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
