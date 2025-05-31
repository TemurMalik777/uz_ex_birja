import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { Wallet } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Holding } from '../holdings/entities/holding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, User])],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
