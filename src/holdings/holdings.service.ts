import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holding } from './entities/holding.entity';
import { Repository } from 'typeorm';
import { ID } from '@nestjs/graphql';

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
    return this.holdingRepo.findOne({
      where: { id },
      relations: ['supplier', 'order_id'],
    });
  }

  async update(id: number, updateHoldingDto: UpdateHoldingDto) {
    const updateHolding = await this.holdingRepo.preload({
      id,
      ...updateHoldingDto,
    });
    if (!updateHolding) {
      throw new NotFoundException(`xato ID ${id}`);
    }
    return this.holdingRepo.save(updateHolding);
  }

  remove(id: number) {
    return this.holdingRepo.delete({ id });
  }
}
