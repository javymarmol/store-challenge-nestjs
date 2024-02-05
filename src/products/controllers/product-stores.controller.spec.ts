import { Test, TestingModule } from '@nestjs/testing';
import { ProductStoresController } from './product-stores.controller';

describe('ProductStoresController', () => {
  let controller: ProductStoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductStoresController],
    }).compile();

    controller = module.get<ProductStoresController>(ProductStoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
