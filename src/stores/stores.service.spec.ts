import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from './stores.service';
import { Store } from './entities/store.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreDto } from './dto/create-store.dto';

describe('StoresService', () => {
  let service: StoresService;
  let repositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
        {
          provide: getRepositoryToken(Store),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            merge: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StoresService>(StoresService);
    repositoryMock = module.get(getRepositoryToken(Store));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a store', async () => {
    const createStoreDto: CreateStoreDto = { name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15' };
    const expectedStore: Store = { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] };

    repositoryMock.create.mockImplementation((createStoreDto: CreateStoreDto) => {
      return expectedStore;
    });

    repositoryMock.save.mockResolvedValue(expectedStore);

    const store = await service.create(createStoreDto);

    expect(store).toEqual(expectedStore);
    expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    expect(repositoryMock.create).toHaveBeenCalledWith(createStoreDto);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(expectedStore);
  });

  it('should return all stores', async () => {
    const expectedStores: Store[] = [
      { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] },
      { id: 2, name: 'Product 2', city: 'SNT', address: 'Av palomares #20-2', products: [] },
    ];

    repositoryMock.find.mockResolvedValue(expectedStores);

    const stores = await service.findAll();

    expect(stores).toEqual(expectedStores);
    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
  });

  it('should return a store by id', async () => {
    const expectedStore: Store = { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] };

    repositoryMock.findOneBy.mockResolvedValue(expectedStore);

    const store = await service.findOne(1);

    expect(store).toEqual(expectedStore);
    expect(repositoryMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a store', async () => {
    const store: Store = { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] };
    const updatedStore: Store = {
      id: 1,
      name: 'Store 1 Updated',
      city: 'BOG',
      address: 'calle 12 #6-15',
      products: [],
    };
    const updateStoreDto: UpdateStoreDto = { name: 'Store 1 Updated' };

    repositoryMock.merge.mockImplementation((store: Store, updateStoreDto: UpdateStoreDto) => {
      Object.assign(store, updateStoreDto);
    });

    repositoryMock.findOneBy.mockResolvedValue(store);
    repositoryMock.save.mockResolvedValue(updatedStore);

    const updated = await service.update(1, updateStoreDto);

    expect(updated).toEqual(updatedStore);
    expect(repositoryMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(repositoryMock.merge).toHaveBeenCalledTimes(1);
    expect(repositoryMock.merge).toHaveBeenCalledWith(store, updateStoreDto);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(updatedStore);
  });

  it('should remove a store', async () => {
    const store: Store = { id: 1, name: 'Store 1', city: 'BOG', address: 'calle 12 #6-15', products: [] };

    repositoryMock.findOneBy.mockResolvedValue(store);

    await service.remove(1);

    expect(repositoryMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(store);
  });
});
