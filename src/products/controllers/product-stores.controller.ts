import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UpdateProductStoresDto } from '../dto/update-product-stores.dto';
import { ProductStoresService } from '../services/product-stores.service';

@Controller('products')
export class ProductStoresController {
  constructor(private readonly productStoresService: ProductStoresService) {}

  @Get(':productId/stores')
  findStoresFromProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productStoresService.findStoresFromProduct(productId);
  }

  @Put(':productId/stores')
  updateStoresFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductStoresDto: UpdateProductStoresDto,
  ) {
    return this.productStoresService.updateStoresFromProduct(productId, updateProductStoresDto);
  }

  @Get(':productId/stores/:storeId')
  findStoreFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.productStoresService.findStoreFromProduct(productId, storeId);
  }

  @Post(':productId/stores/:storeId')
  addStoreToProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.productStoresService.addStoreToProduct(productId, storeId);
  }

  @Delete(':productId/stores/:storeId')
  deleteStoresFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.productStoresService.deleteStoresFromProduct(productId, storeId);
  }
}
