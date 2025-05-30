import { PartialType } from '@nestjs/swagger';
import { CreateOrderLogDto } from './create-order_log.dto';

export class UpdateOrderLogDto extends PartialType(CreateOrderLogDto) {}
