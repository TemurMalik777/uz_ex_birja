import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private readonly walletRepo: Repository<Wallet>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletRepo.save(createWalletDto);
  }

  findAll() {
    return this.walletRepo.find();
  }

  findOne(id: number) {
    return this.walletRepo.findOneBy({ id });
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return this.walletRepo.preload({ id, ...updateWalletDto });
  }

  remove(id: number) {
    return this.walletRepo.delete({ id });
  }
}
