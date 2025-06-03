import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepo: Repository<Complaint>,
  ) {}

  create(createComplaintDto: CreateComplaintDto) {
    return this.complaintRepo.save(createComplaintDto);
  }

  findAll() {
    return this.complaintRepo.find({
      relations: ['complainant_id', 'against_user_id', 'product_id'],
    });
  }

  findOne(id: number) {
    return this.complaintRepo.findOne({
      where: { id },
      relations: ['complainant_id', 'against_user_id', 'product_id'],
    });
  }

  async update(id: number, updateComplaintDto: UpdateComplaintDto) {
    const updateComplaint = await this.complaintRepo.preload({
      id,
      ...updateComplaintDto,
    });
    if (!updateComplaint) {
      throw new NotFoundException(`Complaints with Id  ${id} not found`);
    }
    return this.complaintRepo.save(updateComplaint);
  }

  remove(id: number) {
    return this.complaintRepo.delete({ id });
  }
}
