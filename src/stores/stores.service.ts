import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(Store) private storeRepository: Repository<Store>) {}
  async create(createStoreDto: CreateStoreDto) {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  findAll() {
    return this.storeRepository.find();
  }

  async findOne(id: number) {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException(`Store ${id} not found`);
    }
    return store;
  }

  async update(id: number, changes: UpdateStoreDto) {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException(`Store ${id} not found`);
    }
    this.storeRepository.merge(store, changes);
    return this.storeRepository.save(store);
  }

  async remove(id: number) {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException(`Store ${id} not found`);
    }
    return this.storeRepository.delete(store);
  }
}
