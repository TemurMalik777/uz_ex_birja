import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  CLIENT = 'client',
  SUPPLIER = 'supplier',
  NONE = '',
}

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @Field()
  @Column()
  @ApiProperty({ example: 'Turdiyev Berdi', description: 'Foydalanuvchi ismi' })
  full_name: string;

  @Field()
  @Column()
  @ApiProperty({ example: 'Tashkent, Uzbekistan', description: 'User address' })
  address: string;

  @Field()
  @Column()
  @ApiProperty({ example: 'Birja LLC', description: 'Company name' })
  company_name: string;

  @Field()
  @Column()
  @ApiProperty({ example: '305123456', description: 'INN raqami' })
  inn: string;

  @Field()
  @Column()
  @ApiProperty({ example: '+998901234567', description: 'User phone number' })
  phone: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty({ example: 'email@example.com', description: 'User email' })
  email: string;

  @Field()
  @Column()
  @ApiProperty({
    example: 'hashed_password_here',
    description: 'User password (hashed)',
  })
  password: string;

  @Field()
  @Column()
  @ApiProperty({ example: '12345', description: 'MFO code' })
  mfo: string;

  @Field()
  @Column({ default: '' })
  @ApiProperty({ example: '', description: 'Refresh token', required: false })
  refresh_token: string;

  @Field()
  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Is user active?' })
  is_active: boolean;

  @Field()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  @ApiProperty({
    example: UserRole.CLIENT,
    enum: UserRole,
    description: 'User role',
  })
  role: UserRole;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @ApiProperty({
    example: 'some-uuid-activation-link',
    description: 'Activation link',
    required: false,
  })
  active_link?: string;

  // @BeforeInsert()
  // generateActivationLink() {
  //   this.active_link = uuidv4();
  // }
}
