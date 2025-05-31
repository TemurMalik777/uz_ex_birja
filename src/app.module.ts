import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Admin } from 'typeorm';
import { User } from './users/entities/user.entity';
import { WalletsModule } from './wallets/wallets.module';
import { HoldingsModule } from './holdings/holdings.module';
import { OrderLogsModule } from './order_logs/order_logs.module';
import { OrdersModule } from './orders/orders.module';
import { ComplaintsModule } from './complaints/complaints.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('PG_HOST'),
        port: config.get<number>('PG_PORT'),
        username: config.get<string>('PG_USER'),
        password: config.get<string>('PG_PASSWORD'),
        database: config.get<string>('PG_DB'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [Admin, User],
      }),
    }),
    AdminModule,
    AuthModule,
    UsersModule,
    WalletsModule,
    HoldingsModule,
    OrderLogsModule,
    OrdersModule,
    ComplaintsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
