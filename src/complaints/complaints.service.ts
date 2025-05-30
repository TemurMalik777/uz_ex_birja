import { Injectable } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Repository } from 'typeorm';
import { Complaint } from './entities/complaint.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    return this.complaintRepo.find();
  }

  findOne(id: number) {
    return this.complaintRepo.findOneBy({ id });
  }

  update(id: number, updateComplaintDto: UpdateComplaintDto) {
    return this.complaintRepo.preload({ id, ...updateComplaintDto });
  }

  remove(id: number) {
    return this.complaintRepo.delete({ id });
  }
}
