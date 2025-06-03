import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditDto {
  @ApiProperty({ example: 1, description: 'User ID who performed the action' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 'UPDATE', description: 'Type of action performed' })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    example: 'Product',
    description: 'Name of the entity affected',
  })
  @IsString()
  @IsNotEmpty()
  entity_name: string;

  @ApiProperty({ example: 12, description: 'ID of the entity affected' })
  @IsInt()
  @IsNotEmpty()
  entity_id: number;
}
