import { Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdateUserPasswordDto {
  @Field()
  @IsString()
  @Length(6, 30, { message: "Kamida 6 ta belgi bo'lsin" })
  @ApiProperty({
    example: "pas123",
    description: "Joriy parolni kiriting",
  })
  oldpassword: string;

  @Field()
  @IsString()
  @Length(6, 100, { message: "Kamida 6 ta belgi bo'lsin" })
  @ApiProperty({
    example: "hey123",
    description: "Yangi parolni kiriting",
  })
  newpassword: string;

  @Field()
  @IsString()
  @Length(6, 100, { message: "Kamida 6 ta belgi bo'lsin" })
  @ApiProperty({
    example: "hey123",
    description: "Yangi parolni tasdiqlang",
  })
  confirm_password: string;
}
