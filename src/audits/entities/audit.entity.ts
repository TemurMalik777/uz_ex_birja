import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Field } from '@nestjs/graphql';

@Entity('audits')
export class Audit {
  @ApiProperty({ example: 1, description: 'Audit yozuvining noyob ID raqami' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user_id) => user_id.audtis)
  @Field((type) => Audit)
  @ApiProperty({
    example: 5,
    description: 'Harakatni bajargan foydalanuvchi ID raqami',
  })
  @Column()
  user_id: number;

  @ApiProperty({
    example: 'DELETE',
    description: 'Foydalanuvchi bajargan amal turi',
  })
  @Column()
  action: string;

  @ApiProperty({
    example: 'Product',
    description: 'O‘zgartirilgan entity nomi',
  })
  @Column()
  entity_name: string;

  @ApiProperty({
    example: 42,
    description: 'O‘zgartirilgan entityning ID raqami',
  })
  @Column()
  entity_id: number;

  @ApiProperty({
    example: '2025-05-31T12:34:56.000Z',
    description: 'Audit yozuvi yaratilgan vaqt',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
