import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('products') // === /search/products
  searchProducts(@Query('name') name: string) {
    console.log("name", name);
    return this.searchService.searchProductsByName(name);
  }


  @Get('users')
  searchUsers(@Query('keyword') keyword: string) {
    return this.searchService.searchUsersByName(keyword);
  }

  @Get('orders')
  searchOrders(
    @Query('clientId') clientId: number,
    @Query('productName') productName: string,
  ) {
    return this.searchService.searchOrders(clientId, productName);
  }

  @Get('rejected-products')
  rejected() {
    return this.searchService.rejectedProducts();
  }

  @Get('bids')
  searchBids(@Query('min') min: number, @Query('max') max: number) {
    return this.searchService.searchBidsByPrice(min, max);
  }

  //===============================================
  // search.controller.ts

@Get('lowest-bid-products')
getLowestBidProducts() {
  return this.searchService.searchLowestBidProducts();
}

}
