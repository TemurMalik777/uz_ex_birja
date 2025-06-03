import { Module } from '@nestjs/common';
import { ProductsParamService } from './products_param.service';
import { ProductsParamController } from './products_param.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsParam } from './entities/products_param.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsParam, Product])],
  controllers: [ProductsParamController],
  providers: [ProductsParamService],
  exports: [ProductsParamService],
})
export class ProductsParamModule {}
