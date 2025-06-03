import { Module } from '@nestjs/common';
import { AdminReviwsController } from './admin_reviws.controller';
import { AdminReviwsService } from './admin_reviws.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminReview } from './entities/admin_reviw.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminReview])],
  controllers: [AdminReviwsController],
  providers: [AdminReviwsService],
  exports: [AdminReviwsService],
})
export class AdminReviwsModule {}
