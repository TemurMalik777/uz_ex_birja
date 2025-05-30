import { IsInt, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintDto {
  @IsInt()
  @ApiProperty({
    example: 123,
    description: 'Shikoyat qilayotgan foydalanuvchining ID raqami',
  })
  complainant_id: number;

  @IsInt()
  @ApiProperty({
    example: 456,
    description: 'Shikoyat qilingan foydalanuvchining ID raqami',
  })
  against_user_id: number;

  @IsInt()
  @ApiProperty({
    example: 789,
    description: 'Shikoyat qilingan mahsulot ID raqami',
  })
  product_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bu foydalanuvchi mahsulotni noto‘g‘ri yetkazdi',
    description: 'Shikoyat matni',
  })
  message: string;

  @IsString()
  @IsIn(['pending', 'resolved', 'rejected'])
  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'resolved', 'rejected'],
    description: 'Shikoyat holati',
  })
  status: string;
}
