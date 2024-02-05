import { Test, TestingModule } from '@nestjs/testing';
import { ProductStoresController } from './product-stores.controller';
import { ProductStoresService } from '../services/product-stores.service';

describe('ProductStoresController', () => {
  let controller: ProductStoresController;
  const mockProductStoresService = {
    findStoreFromProduct: jest.fn(),
    addStoreToProduct: jest.fn(),
    findStoresFromProduct: jest.fn(),
    updateStoresFromProduct: jest.fn(),
    deleteStoresFromProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductStoresController],
      providers: [{ provide: ProductStoresService, useValue: mockProductStoresService }],
    }).compile();

    controller = module.get<ProductStoresController>(ProductStoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
