import { Test, TestingModule } from '@nestjs/testing';
import { ProductStoresService } from './product-stores.service';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Store } from '../../stores/entities/store.entity';
import { UpdateProductStoresDto } from '../dto/update-product-stores.dto';
import { In } from 'typeorm';

describe('ProductStoresService', () => {
  let service: ProductStoresService;
  let productRepositoryMock: any;
  let storeRepositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductStoresService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findOne: jest.fn(),
            merge: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Store),
          useValue: {
            findBy: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductStoresService>(ProductStoresService);
    productRepositoryMock = module.get(getRepositoryToken(Product));
    storeRepositoryMock = module.get(getRepositoryToken(Store));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a store to product', async () => {
    const productId = 1;
    const storeId = 1;
    const initialProduct: Product = {
      id: 1,
      name: 'Product 1',
      price: 12.5,
      type: 'perecedero',
      stores: [],
    };

    const initialStore: Store = { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] };

    const expectedProduct: Product = {
      id: 1,
      name: 'Product 1',
      price: 12.5,
      type: 'perecedero',
      stores: [initialStore],
    };

    productRepositoryMock.findOne.mockResolvedValue(initialProduct);
    storeRepositoryMock.findOneBy.mockResolvedValue(initialStore);
    productRepositoryMock.save.mockResolvedValue(expectedProduct);

    const product = await service.addStoreToProduct(productId, storeId);

    expect(product).toEqual(expectedProduct);
    expect(productRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
      relations: {
        stores: true,
      },
      where: { id: productId },
    });
    expect(storeRepositoryMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(storeRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: storeId });
    expect(productRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.save).toHaveBeenCalledWith(expectedProduct);
  });

  it('should return all stores by product', async () => {
    const expectedStores: Store[] = [
      { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] },
      { id: 2, name: 'Product 2', city: 'SNT', address: 'Av palomares #20-2', products: [] },
    ];

    const expectedProduct: Product = {
      id: 1,
      name: 'Product 1',
      price: 12.5,
      type: 'perecedero',
      stores: expectedStores,
    };

    productRepositoryMock.findOne.mockResolvedValue(expectedProduct);

    const stores = await service.findStoresFromProduct(1);

    expect(stores).toEqual(expectedStores);
    expect(productRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
      relations: {
        stores: true,
      },
      where: { id: 1 },
    });
  });

  it('should return a store product by id', async () => {
    const expectedStore: Store = { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] };

    const expectedProduct: Product = {
      id: 1,
      name: 'Product 1',
      price: 12.5,
      type: 'perecedero',
      stores: [expectedStore],
    };

    productRepositoryMock.findOne.mockResolvedValue(expectedProduct);

    const store = await service.findStoreFromProduct(1, 1);

    expect(store).toEqual(expectedStore);
    expect(productRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
      relations: {
        stores: true,
      },
      where: { id: 1 },
    });
  });

  it('should update all stores from product', async () => {
    const product: Product = { id: 1, name: 'Product 1', price: 12.5, type: 'perecedero', stores: [] };
    const updateProductStoresDto: UpdateProductStoresDto = { stores: [1, 2] };

    const expectedStores: Store[] = [
      { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] },
      { id: 2, name: 'Product 2', city: 'SNT', address: 'Av palomares #20-2', products: [] },
    ];

    const expectedProduct: Product = {
      id: 1,
      name: 'Product 1',
      price: 12.5,
      type: 'perecedero',
      stores: expectedStores,
    };

    productRepositoryMock.findOne.mockResolvedValue(product);
    storeRepositoryMock.findBy.mockResolvedValue(expectedStores);
    productRepositoryMock.save.mockResolvedValue(expectedProduct);

    const updated = await service.updateStoresFromProduct(1, updateProductStoresDto);

    expect(updated).toEqual(expectedProduct);
    expect(productRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
      relations: {
        stores: true,
      },
      where: { id: 1 },
    });
    expect(storeRepositoryMock.findBy).toHaveBeenCalledTimes(1);
    expect(storeRepositoryMock.findBy).toHaveBeenCalledWith({ id: In([1, 2]) });
    expect(productRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.save).toHaveBeenCalledWith(expectedProduct);
  });

  it('should delete a store from product', async () => {
    const expectedStores: Store[] = [
      { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] },
      { id: 2, name: 'Product 2', city: 'SNT', address: 'Av palomares #20-2', products: [] },
    ];

    const expectedProduct: Product = {
      id: 1,
      name: 'Product 1',
      price: 12.5,
      type: 'perecedero',
      stores: expectedStores,
    };

    const productUpdated: Product = {
      id: 1,
      name: 'Product 1',
      price: 12.5,
      type: 'perecedero',
      stores: [{ id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] }],
    };

    productRepositoryMock.findOne.mockResolvedValue(expectedProduct);

    await service.deleteStoresFromProduct(1, 2);

    expect(productRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
      relations: {
        stores: true,
      },
      where: { id: 1 },
    });
    expect(productRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(productRepositoryMock.save).toHaveBeenCalledWith(productUpdated);
  });
});
