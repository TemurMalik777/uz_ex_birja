import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Field } from '@nestjs/graphql';

@Entity('contact_messages')
export class ContactMessage {
  @ApiProperty({ example: 1, description: 'Unique ID of the message' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 5,
    description: 'ID of the user who sent the message',
  })
  @ManyToOne(() => User, (user_id) => user_id.contactmessags)
  @Field((type) => ContactMessage)
  user_id: number;

  @ApiProperty({
    example: 'Regarding Product Quality',
    description: 'Subject of the message',
  })
  @Column()
  subject: string;

  @ApiProperty({
    example: 'I have concerns about the product quality...',
    description: 'Content of the message',
  })
  @Column()
  message: string;
}
