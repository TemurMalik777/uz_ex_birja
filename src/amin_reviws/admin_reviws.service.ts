import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminReviewDto } from './dto/create-admin_reviw.dto';
import { UpdateAdminReviwDto } from './dto/update-admin_reviw.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminReview } from './entities/admin_reviw.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminReviwsService {
  constructor(
    @InjectRepository(AdminReview)
    private readonly adminReviewRepo: Repository<AdminReview>,
  ) {}

  create(createAdminReviwDto: CreateAdminReviewDto) {
    return this.adminReviewRepo.save(createAdminReviwDto);
  }

  findAll() {
    return this.adminReviewRepo.find({ relations: ['admin_id', 'product_id'] });
  }

  findOne(id: number) {
    return this.adminReviewRepo.findOne({
      where: { id },
      relations: ['admin_id'],
    });
  }

  async update(id: number, updateAminReviwDto: UpdateAdminReviwDto) {
    const updateAdmin = await this.adminReviewRepo.preload({
      id,
      ...updateAminReviwDto,
    });
    if (!updateAdmin) {
      throw new NotFoundException('AdminReview not found');
    }

    return this.adminReviewRepo.save(updateAdmin);
  }

  remove(id: number) {
    return this.adminReviewRepo.delete({ id });
  }
}
