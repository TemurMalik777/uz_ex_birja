import { IsString, IsIP } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @IsString()
  @ApiProperty({ example: 'eyJh...token...' })
  refresh_token: string;

  @IsString()
  @ApiProperty({ example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' })
  user_agent: string;

  @IsIP()
  @ApiProperty({ example: '192.168.1.1' })
  ip_address: string;
}
