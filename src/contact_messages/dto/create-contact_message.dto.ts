import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({ example: 5, description: 'ID of the user sending the message' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 'Regarding Product Quality', description: 'Subject of the message' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'I have concerns about the product quality...', description: 'Message content' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
