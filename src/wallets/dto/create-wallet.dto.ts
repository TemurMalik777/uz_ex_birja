import { Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsPositive,
} from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID si' })
  @IsInt()
  @IsNotEmpty()
  @Field((type)=>Int, {nullable: true})
  userId?: number;

  @ApiProperty({ example: 100000, description: 'Hamyon balansi' })
  @IsInt()
  @IsPositive()
  balance: number;

  @ApiProperty({ example: 'UZS', description: 'Valyuta kodi' })
  @IsString()
  @IsNotEmpty()
  locked_balance: string;
}
