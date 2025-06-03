import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.orderLogRepo.find({ relations: ['orderasid'] });
  }

  findOne(id: number) {
    return this.orderLogRepo.findOneBy({ id });
  }

  async update(id: number, updateOrderLogDto: UpdateOrderLogDto) {
    const updateOderLogs = await this.orderLogRepo.preload({
      id,
      ...updateOrderLogDto,
    });
    if (!updateOderLogs) {
      throw new NotFoundException(`Id ${id} not found`);
    }
    return this.orderLogRepo.save(updateOderLogs);
  }

  remove(id: number) {
    return this.orderLogRepo.delete({ id });
  }
}
