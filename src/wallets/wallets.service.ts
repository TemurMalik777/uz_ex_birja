import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private readonly walletRepo: Repository<Wallet>,
  ) {}

  async create(createWalletDto: CreateWalletDto, user: User) {
    // console.log("aaaaaa", user);
    // if (!user) {
    //   throw new Error('User is not defined');
    // }
    // const newWallet = this.walletRepo.create({
    //   ...createWalletDto,
    //   userId: user.id,
    // });
    
    return await this.walletRepo.save(createWalletDto);
  }

  findAll() {
    return this.walletRepo.find({ relations: ['userId'] });
  }

  findOne(id: number) {
    return this.walletRepo.findOne({
      where: { id },
      relations: ['userId'],
    });
  }

  // async update(id: string, updateWalletDto: UpdateWalletDto) {
  //   const wallet = await this.walletRepo.preload({ id: +id, ...updateWalletDto });
  //   return wallet
  // }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.walletRepo.preload({ id, ...updateWalletDto });

    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${id} not found`);
    }

    return await this.walletRepo.save(wallet);
  }

  remove(id: number) {
    return this.walletRepo.delete({ id });
  }
}
