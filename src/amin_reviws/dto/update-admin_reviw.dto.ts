import { PartialType } from '@nestjs/swagger';
import { CreateAdminReviewDto } from './create-admin_reviw.dto';

export class UpdateAdminReviwDto extends PartialType(CreateAdminReviewDto) {}
