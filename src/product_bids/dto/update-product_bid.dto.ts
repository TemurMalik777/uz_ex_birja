import { PartialType } from '@nestjs/swagger';
import { CreateProductBidDto } from './create-product_bid.dto';

export class UpdateProductBidDto extends PartialType(CreateProductBidDto) {}
