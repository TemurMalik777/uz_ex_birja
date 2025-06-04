import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AdminReview } from '../../amin_reviws/entities/admin_reviw.entity';

export enum AdminRole {
  SUPPERADMIN = 'supperadmin',
  ADMIN = 'admin',
}

@ObjectType()
@Entity()
export class Admin {
  @ApiProperty({ example: 1 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ali Valiyev' })
  @Field()
  @Column()
  fullName: string;

  @ApiProperty({ example: 'ali123' })
  @Field()
  @Column()
  username: string;

  @ApiProperty({ example: 'ali@example.com' })
  @Field()
  @Column()
  email: string;

  @ApiProperty({ example: '$2b$10$hashedPasswordString' })
  @Field()
  @Column()
  hashed_password: string;

  @ApiProperty({ example: 'true' })
  @Field()
  @Column({ default: false })
  is_creator: string;

  @ApiProperty({
    example: AdminRole.ADMIN,
    enum: AdminRole,
    description: 'Admin role',
  })
  @Field()
  @Column({ type: 'enum', enum: AdminRole, default: AdminRole.ADMIN })
  role: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Faqat "true" yoki "false" bo‘lishi mumkin',
  })
  @Field()
  @Column({ nullable: true, default: 'true' })  // Bazada default 'true'
  is_active: string;

  @ApiProperty({ example: 'some-refresh-token', required: false })
  @Field()
  @Column()
  refresh_token: string;

  @ApiProperty({ example: '+998901234567' })
  @Field()
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiProperty({
    example: 'some-uuid-activation-link',
    description: 'Activation link',
    required: false,
  })
  active_link?: string;

  @OneToMany((type) => AdminReview, (adminreview) => adminreview.admin_id)
  @Field((type) => [AdminReview])
  adminreviews: AdminReview[];
}
