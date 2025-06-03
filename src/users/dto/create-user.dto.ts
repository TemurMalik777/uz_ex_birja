import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @Field()
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'Toshkent, Amir Temur ko‘chasi 10' })
  @Field()
  @IsString()
  address: string;

  @ApiProperty({ example: 'Tech Solutions LLC' })
  @Field()
  @IsString()
  company_name: string;

  @ApiProperty({ example: '123456789' })
  @Field()
  @IsString()
  inn: string;

  @ApiProperty({ example: '+998901234567' })
  @Field()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ example: 'ali@example.com' })
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  @Field()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  @Field()
  @IsString()
  confirm_password: string;

  @ApiProperty({ example: '123456' })
  @Field()
  @IsString()
  mfo: string;

  // Agar kerak bo‘lsa, ushbu maydonlarni ham qo‘shishingiz mumkin:
  @ApiProperty({ example: true })
  @Field()
  @IsString()
  is_active: string;

  // @ApiProperty({ example: 'user' })
  // @Field()
  // @IsString()
  // role: string;

  // @ApiProperty({ example: 'some-activation-link' })
  // @Field()
  // @IsString()
  // active_link: string;
}
