import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIP } from 'class-validator';
import { User } from 'src/users/entities/user.entity';


@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  
  @Column()
  @IsString()
  @ApiProperty({ example: 'eyJh...token...' })
  refresh_token: string;
  
  @Column()
  @IsString()
  @ApiProperty({ example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' })
  user_agent: string;
  
  @Column()
  @IsIP()
  @ApiProperty({ example: '192.168.1.1' })
  ip_address: string;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  user: User;
}
