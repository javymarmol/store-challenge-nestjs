import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity';
import { UpdateProductStoresDto } from './dto/update-product-stores.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return this.productRepository.delete(product);
  }

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
