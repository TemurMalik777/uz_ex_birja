import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactMessagesService } from './contact_messages.service';
import { CreateContactMessageDto } from './dto/create-contact_message.dto';
import { UpdateContactMessageDto } from './dto/update-contact_message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ContactMessage } from './entities/contact_message.entity';


@ApiBearerAuth('access-token')
@ApiTags('Contact Messages')
@Controller('contact-messages')
export class ContactMessagesController {
  constructor(
    private readonly contactMessagesService: ContactMessagesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a contact message' })
  @ApiResponse({
    status: 201,
    description: 'Message created successfully',
    type: ContactMessage,
  })
  create(@Body() createContactMessageDto: CreateContactMessageDto) {
    return this.contactMessagesService.create(createContactMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiResponse({
    status: 200,
    description: 'List of all contact messages',
    type: [ContactMessage],
  })
  findAll() {
    return this.contactMessagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact message by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Contact message found',
    type: ContactMessage,
  })
  @ApiResponse({ status: 404, description: 'Message not found' })
  findOne(@Param('id') id: string) {
    return this.contactMessagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contact message by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Contact message updated',
    type: ContactMessage,
  })
  @ApiResponse({ status: 404, description: 'Message not found' })
  update(
    @Param('id') id: string,
    @Body() updateContactMessageDto: UpdateContactMessageDto,
  ) {
    return this.contactMessagesService.update(+id, updateContactMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact message by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Message deleted successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  remove(@Param('id') id: string) {
    return this.contactMessagesService.remove(+id);
  }
}
