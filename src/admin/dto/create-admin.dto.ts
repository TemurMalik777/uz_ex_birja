import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsBooleanString,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @Field()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'ali123' })
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'ali@example.com' })
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @Field()
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({
    nullable: true,
    description: 'Faqat "true" yoki "false" bo‘lishi mumkin',
  })
  @Field()
  @IsNotEmpty()
  @IsBooleanString()
  is_creator: string;

  @ApiProperty({
    example: 'false',
    description: 'Faqat "true" yoki "false" bo‘lishi mumkin',
  })
  @Field()
  @IsNotEmpty()
  @IsBooleanString()
  is_active: string;

  @ApiProperty({ example: null, required: false })
  @Field()
  @IsOptional()
  @IsString()
  refresh_token?: string;

  @ApiProperty({ example: '+998901234567' })
  @Field()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;
}
