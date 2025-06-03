import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditsService {
  constructor(
    @InjectRepository(Audit) private readonly auditRepo: Repository<Audit>,
  ) {}

  create(createAuditDto: CreateAuditDto) {
    return this.auditRepo.save(createAuditDto);
  }

  async findAll() {
    const findAllAudits = await this.auditRepo.find({ relations: ['user_id'] });
    // console.log(findAllAudits);
    return findAllAudits
  }

  findOne(id: number) {
    return this.auditRepo.findOne({
      where: { id },
      relations: ['user_id'],
    });
  }

  async update(id: number, updateAuditDto: UpdateAuditDto) {
    // console.log('UpdateAuditDto:', updateAuditDto);
    const audit = await this.auditRepo.preload({ id, ...updateAuditDto });
    if (!audit) {
      throw new NotFoundException(`Audit with ID ${id} not found`);
    }
    // console.log('Audit preload:', audit);

    const result = await this.auditRepo.save(audit);
    // console.log(result);
    return result
  }

  remove(id: number) {
    return this.auditRepo.delete({ id });
  }
}
