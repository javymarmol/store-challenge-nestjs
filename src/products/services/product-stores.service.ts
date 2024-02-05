import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductStoresDto } from '../dto/update-product-stores.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Store } from '../../stores/entities/store.entity';

@Injectable()
export class ProductStoresService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}
  async findStoreFromProduct(productId: number, storeId: number) {
    const product = await this.productRepository.findOne({
      relations: {
        stores: true,
      },
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    const store = product.stores.find((s) => s.id === storeId);

    if (!store) {
      throw new BadRequestException(`store ${storeId} is not added to product ${productId}`);
    }

    return store;
  }

  async addStoreToProduct(productId: number, storeId: number) {
    const product = await this.productRepository.findOne({
      relations: {
        stores: true,
      },
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    const alreadyAdded = product.stores.find((s) => s.id === storeId);

    if (alreadyAdded) {
      throw new BadRequestException(`store ${storeId} is already added to product ${productId}`);
    }

    const store = await this.storeRepository.findOneBy({ id: storeId });

    if (!store) {
      throw new NotFoundException(`Store ${storeId} not found`);
    }

    product.stores.push(store);
    return this.productRepository.save(product);
  }

  async findStoresFromProduct(productId: number) {
    const product = await this.productRepository.findOne({
      relations: {
        stores: true,
      },
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    return product.stores;
  }

  async updateStoresFromProduct(productId: number, payload: UpdateProductStoresDto) {
    const product = await this.productRepository.findOne({
      relations: {
        stores: true,
      },
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    product.stores = await this.storeRepository.findBy({ id: In(payload.stores) });
    return this.productRepository.save(product);
  }

  async deleteStoresFromProduct(productId: number, storeId: number) {
    const product = await this.productRepository.findOne({
      relations: {
        stores: true,
      },
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    product.stores = product.stores.filter((s) => s.id !== storeId);
    return this.productRepository.save(product);
  }
}
