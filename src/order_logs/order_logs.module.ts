import { Module } from '@nestjs/common';
import { OrderLogsService } from './order_logs.service';
import { OrderLogsController } from './order_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLog } from './entities/order_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLog])],
  controllers: [OrderLogsController],
  providers: [OrderLogsService],
})
export class OrderLogsModule {}
