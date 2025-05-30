import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@nestjs/graphql';
import {
  IsBooleanString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateAdminDto {
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

  @ApiProperty({ example: 'NewStrongPassword123', required: false })
  @Field()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'true' })
  @Field()
  @IsNotEmpty()
  @IsBooleanString()
  is_creator: string;

  @ApiProperty({ example: 'false' })
  @Field()
  @IsNotEmpty()
  @IsBooleanString()
  is_active: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  refresh_token?: string;

  @ApiProperty({ example: '+998901234567' })
  @Field()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;
}
