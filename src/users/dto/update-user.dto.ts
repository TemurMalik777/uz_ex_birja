// import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

// @InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @Field()
  // @IsString()
  // full_name: string;
  // @Field()
  // @IsString()
  // address: string;
  // @Field()
  // @IsString()
  // company_name: string;
  // @Field()
  // @IsString()
  // inn: string;
  // @Field()
  // @IsPhoneNumber('UZ')
  // phone: string;
  // @Field()
  // @IsEmail()
  // email: string;
  // @Field()
  // @IsStrongPassword()
  // password: string;
  // @IsString()
  // @Field()
  // confirm_password: string;
  // @Field()
  // @IsString()
  // mfo: string;
  // @Field()
  // @IsString()
  // is_active?: boolean;
  // @Field()
  // @IsString()
  // role?: string;
  // @Field()
  // @IsString()
  // active_link?: string;
}
