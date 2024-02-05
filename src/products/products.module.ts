import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Store } from '../stores/entities/store.entity';
import { ProductStoresController } from './controllers/product-stores.controller';
import { ProductStoresService } from './services/product-stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Store])],
  controllers: [ProductsController, ProductStoresController],
  providers: [ProductsService, ProductStoresService],
})
export class ProductsModule {}
