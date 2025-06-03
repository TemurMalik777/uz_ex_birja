import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderRepo.save(createOrderDto);
  }

  findAll() {
    return this.orderRepo.find({ relations: ['client_id'] });
  }

  findOne(id: number) {
    return this.orderRepo.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updateOrders = await this.orderRepo.preload({
      id,
      ...updateOrderDto,
    });
    if (!updateOrders) {
      throw new NotFoundException('Id Topilmadi');
    }
    return this.orderRepo.save(updateOrders);
  }

  remove(id: number) {
    return this.orderRepo.delete({ id });
  }
}
