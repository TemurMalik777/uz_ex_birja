import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

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
import { SessionsModule } from './sessions/sessions.module';
import { ContactMessagesModule } from './contact_messages/contact_messages.module';
import { AuditsModule } from './audits/audits.module';
import { AdminReviwsModule } from './amin_reviws/admin_reviws.module';
import { ProductsModule } from './products/products.module';
import { ProductBidsModule } from './product_bids/product_bids.module';
import { ProductsParamModule } from './products_param/products_param.module';
import { ProductImagesModule } from './product_images/product_images.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    WinstonModule.forRoot({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.printf(({ timestamp, level, message, ...meta }) => {
              return `${timestamp} [${level}]: ${message} ${
                Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
              }`;
            }),
          ),
        }),
      ],
    }),
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
    SessionsModule,
    ContactMessagesModule,
    AuditsModule,
    AdminReviwsModule,
    ProductsModule,
    ProductBidsModule,
    ProductsParamModule,
    ProductImagesModule,
    ProductCategoryModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
