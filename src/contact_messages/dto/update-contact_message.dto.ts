import { PartialType } from '@nestjs/swagger';
import { CreateContactMessageDto } from './create-contact_message.dto';

export class UpdateContactMessageDto extends PartialType(CreateContactMessageDto) {}
