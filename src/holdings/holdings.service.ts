import { Injectable } from '@nestjs/common';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holding } from './entities/holding.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HoldingsService {
  constructor(
    @InjectRepository(Holding)
    private readonly holdingRepo: Repository<Holding>,
  ) {}

  create(createHoldingDto: CreateHoldingDto) {
    return this.holdingRepo.save(createHoldingDto);
  }

  findAll() {
    return this.holdingRepo.find({ relations: ['supplier', 'order_id'] });
  }

  findOne(id: number) {
    return this.holdingRepo.findOneBy({ id });
  }

  update(id: number, updateHoldingDto: UpdateHoldingDto) {
    return this.holdingRepo.preload({ id, ...updateHoldingDto });
  }

  remove(id: number) {
    return this.holdingRepo.delete({ id });
  }
}
