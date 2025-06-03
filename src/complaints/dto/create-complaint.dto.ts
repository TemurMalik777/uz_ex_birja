import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

enum ComplaintStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export class CreateComplaintDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the complainant (user making the complaint)',
  })
  @IsInt()
  @IsNotEmpty()
  complainant_id: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the user the complaint is against',
  })

  @ApiProperty({
    example: 'Product was defective or fake.',
    description: 'Complaint message',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: 'pending',
    description: 'Complaint status (e.g., pending, resolved)',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
