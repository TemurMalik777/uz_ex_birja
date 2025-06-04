import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Search') // Swagger dagi tag nomi
@ApiBearerAuth('access-token') // Swagger token qo'yish uchun (Swagger config'dagi nom bilan bir xil)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('products')
  @ApiOperation({ summary: 'Search products by name' })
  @ApiQuery({ name: 'name', required: true, description: 'Product name to search' })
  searchProducts(@Query('name') name: string) {
    return this.searchService.searchProductsByName(name);
  }

  @Get('users')
  @ApiOperation({ summary: 'Search users by keyword' })
  @ApiQuery({ name: 'keyword', required: true, description: 'Keyword for user search' })
  searchUsers(@Query('keyword') keyword: string) {
    return this.searchService.searchUsersByName(keyword);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Search orders by clientId and product name' })
  @ApiQuery({ name: 'clientId', required: false, description: 'Client ID' })
  @ApiQuery({ name: 'productName', required: false, description: 'Product name' })
  searchOrders(
    @Query('clientId') clientId: number,
    @Query('productName') productName: string,
  ) {
    return this.searchService.searchOrders(clientId, productName);
  }

  @Get('rejected-products')
  @ApiOperation({ summary: 'Get all rejected products' })
  rejected() {
    return this.searchService.rejectedProducts();
  }

  @Get('bids')
  @ApiOperation({ summary: 'Search bids between min and max price' })
  @ApiQuery({ name: 'min', required: false, description: 'Minimum price' })
  @ApiQuery({ name: 'max', required: false, description: 'Maximum price' })
  searchBids(@Query('min') min: number, @Query('max') max: number) {
    return this.searchService.searchBidsByPrice(min, max);
  }

  @Get('lowest-bid-products')
  @ApiOperation({ summary: 'Get products with the lowest bids' })
  getLowestBidProducts() {
    return this.searchService.searchLowestBidProducts();
  }
}
