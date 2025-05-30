import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Complaint } from './entities/complaint.entity';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Mutation(() => Complaint)
  createComplaint(
    @Args('createComplaint') createComplaintDto: CreateComplaintDto,
  ) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Query(() => [Complaint])
  findAllComplaint() {
    return this.complaintsService.findAll();
  }

  @Query(() => Complaint)
  findOneComplaint(@Args('id', { type: () => ID }) id: number) {
    return this.complaintsService.findOne(id);
  }

  @Mutation(':id')
  updateComplaint(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateComplaint') updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Mutation(() => Complaint)
  removeComplaint(@Args('id', { type: () => ID }) id: number) {
    return this.complaintsService.remove(id);
  }
}
