import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminReviewDto {
  @ApiProperty({ example: 3, description: 'Admin ID' })
  @IsInt()
  @IsNotEmpty()
  admin_id: number;

  // @ApiProperty({ example: 10, description: 'Product ID' })
  // @IsInt()
  // @IsNotEmpty()
  // product_id: number;

  @ApiProperty({ example: 'APPROVED', description: 'Review status' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'Looks good.', description: 'Comment by admin' })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ example: 'QUALITY_CHECK', description: 'Type of review' })
  @IsString()
  @IsNotEmpty()
  review_type: string;
}
