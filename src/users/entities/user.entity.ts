import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wallet } from '../../wallets/entities/wallet.entity';
import { Holding } from '../../holdings/entities/holding.entity';
import { Order } from '../../orders/entities/order.entity';
import { Complaint } from '../../complaints/entities/complaint.entity';
import { ContactMessage } from '../../contact_messages/entities/contact_message.entity';
import { Audit } from '../../audits/entities/audit.entity';
import { Product } from '../../products/entities/product.entity';
import { Session } from '../../sessions/entities/session.entity';
// import { Session } from 'inspector/promises';

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
  @ApiProperty({
    example: false,
    description: 'Is user active?',
  })
  is_active: string;

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

  @OneToMany((type) => Wallet, (wallet) => wallet.userId)
  @Field((type) => [Wallet])
  wallets: Wallet[];

  @OneToMany((type) => Holding, (holding) => holding.supplier)
  @Field((type) => [Holding])
  holdings: Holding[];

  @OneToMany((type) => Order, (order) => order.client_id)
  @Field((type) => [Order])
  orders: Order[];

  @OneToMany((type) => Complaint, (complaint) => complaint.complainant_id)
  @Field((type) => [Complaint])
  complaints: Complaint[];

  @OneToMany((type) => ContactMessage, (contactmessag) => contactmessag.user_id)
  @Field((type) => [ContactMessage])
  contactmessags: ContactMessage[];

  @OneToMany((type) => Audit, (audit) => audit.user_id)
  @Field((type) => [Audit])
  audtis: Audit[];

  @OneToMany((type) => Product, (product) => product.supplier_id)
  @Field((type) => [Product])
  products: Product[];

  @OneToMany(() => Session, (sessions) => sessions.user, { cascade: true })
  sessions: Session[];

  @OneToMany(
    () => Complaint,
    (complaint_user) => complaint_user.against_user_id,
  )
  complaint_user: Complaint[];
}
