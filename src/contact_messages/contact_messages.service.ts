import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactMessageDto } from './dto/create-contact_message.dto';
import { UpdateContactMessageDto } from './dto/update-contact_message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactMessage } from './entities/contact_message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contacMesageRepo: Repository<ContactMessage>,
  ) {}

  create(createContactMessageDto: CreateContactMessageDto) {
    return this.contacMesageRepo.save(createContactMessageDto);
  }

  findAll() {
    return this.contacMesageRepo.find({ relations: ['user_id'] });
  }

  findOne(id: number) {
    return this.contacMesageRepo.findOne({
      where: { id },
      relations: ['user_id'],
    });
  }

  async update(id: number, updateContactMessageDto: UpdateContactMessageDto) {
    const updateContactMessage = await this.contacMesageRepo.preload({
      id,
      ...updateContactMessageDto,
    });
    if (!updateContactMessage) {
      throw new NotFoundException(`Contact messages ID ${id} not found;`);
    }

    return this.contacMesageRepo.save(updateContactMessage);
  }

  remove(id: number) {
    return this.contacMesageRepo.delete({ id });
  }
}
