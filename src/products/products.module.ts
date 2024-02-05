import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Store } from '../stores/entities/store.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Product, Store]) ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
