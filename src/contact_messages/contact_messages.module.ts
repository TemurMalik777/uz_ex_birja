import { Module } from '@nestjs/common';
import { ContactMessagesService } from './contact_messages.service';
import { ContactMessagesController } from './contact_messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessage } from './entities/contact_message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage])],
  controllers: [ContactMessagesController],
  providers: [ContactMessagesService],
})
export class ContactMessagesModule {}
