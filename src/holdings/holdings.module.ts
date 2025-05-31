import { Module } from '@nestjs/common';
import { HoldingsService } from './holdings.service';
import { HoldingsController } from './holdings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holding } from './entities/holding.entity';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Holding, User, Order])],
  controllers: [HoldingsController],
  providers: [HoldingsService],
})
export class HoldingsModule {}
