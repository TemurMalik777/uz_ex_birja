import { Injectable } from '@nestjs/common';
import { CreateOrderLogDto } from './dto/create-order_log.dto';
import { UpdateOrderLogDto } from './dto/update-order_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLog } from './entities/order_log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderLogsService {
  constructor(
    @InjectRepository(OrderLog)
    private readonly orderLogRepo: Repository<OrderLog>,
  ) {}

  create(createOrderLogDto: CreateOrderLogDto) {
    return this.orderLogRepo.save(createOrderLogDto);
  }

  findAll() {
    return this.orderLogRepo.find();
  }

  findOne(id: number) {
    return this.orderLogRepo.findOneBy({ id });
  }

  update(id: number, updateOrderLogDto: UpdateOrderLogDto) {
    return this.orderLogRepo.preload({ id, ...updateOrderLogDto });
  }

  remove(id: number) {
    return this.orderLogRepo.delete({ id });
  }
}
