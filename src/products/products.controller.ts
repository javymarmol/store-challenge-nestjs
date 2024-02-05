import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductStoresDto } from './dto/update-product-stores.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Get(':productId/stores')
  findStoresFromProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findStoresFromProduct(productId);
  }

  @Put(':productId/stores')
  updateStoresFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductStoresDto: UpdateProductStoresDto,
  ) {
    return this.productsService.updateStoresFromProduct(productId, updateProductStoresDto);
  }

  @Get(':productId/stores/:storeId')
  findStoreFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.productsService.findStoreFromProduct(productId, storeId);
  }

  @Post(':productId/stores/:storeId')
  addStoreToProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.productsService.addStoreToProduct(productId, storeId);
  }

  @Delete(':productId/stores/:storeId')
  deleteStoresFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    return this.productsService.deleteStoresFromProduct(productId, storeId);
  }
}
