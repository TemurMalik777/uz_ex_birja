import { Module } from '@nestjs/common';
import { ProductBidsService } from './product_bids.service';
import { ProductBidsController } from './product_bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBid } from './entities/product_bid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductBid])],
  controllers: [ProductBidsController],
  providers: [ProductBidsService],
  exports: [ProductBidsService],
})
export class ProductBidsModule {}
