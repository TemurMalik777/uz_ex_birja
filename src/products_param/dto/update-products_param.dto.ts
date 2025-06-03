import { PartialType } from '@nestjs/swagger';
import { CreateProductsParamDto } from './create-products_param.dto';

export class UpdateProductsParamDto extends PartialType(CreateProductsParamDto) {}
