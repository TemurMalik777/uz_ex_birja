import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductsParam } from '../products_param/entities/products_param.entity';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { ProductBid } from '../product_bids/entities/product_bid.entity';
// import { Product, ProductParam, User, Order, ProductBid } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductsParam, User, Order, ProductBid]),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
