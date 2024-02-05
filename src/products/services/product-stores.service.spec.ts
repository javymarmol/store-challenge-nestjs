import { Test, TestingModule } from '@nestjs/testing';
import { ProductStoresService } from './product-stores.service';

describe('ProductStoresService', () => {
  let service: ProductStoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductStoresService],
    }).compile();

    service = module.get<ProductStoresService>(ProductStoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
