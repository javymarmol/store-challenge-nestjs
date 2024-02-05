import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
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

    service = module.get<ProductsService>(ProductsService);
    repositoryMock = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = { name: 'Store 1', price: 12.5, type: 'perecedero' };
    const expectedProduct: Product = { id: 1, name: 'Product 1', price: 12.5, type: 'perecedero', stores: [] };

    repositoryMock.create.mockImplementation((createProductDto: CreateProductDto) => {
      return expectedProduct;
    });

    repositoryMock.save.mockResolvedValue(expectedProduct);

    const store = await service.create(createProductDto);

    expect(store).toEqual(expectedProduct);
    expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    expect(repositoryMock.create).toHaveBeenCalledWith(createProductDto);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(expectedProduct);
  });

  it('should return all products', async () => {
    const expectedProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 12.5, type: 'perecedero', stores: [] },
      { id: 2, name: 'Product 2', price: 49.99, type: 'No perecedero', stores: [] },
    ];

    repositoryMock.find.mockResolvedValue(expectedProducts);

    const products = await service.findAll();

    expect(products).toEqual(expectedProducts);
    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
  });

  it('should return a product by id', async () => {
    const expectedProduct: Product = { id: 1, name: 'Product 1', price: 12.5, type: 'perecedero', stores: [] };

    repositoryMock.findOneBy.mockResolvedValue(expectedProduct);

    const product = await service.findOne(1);

    expect(product).toEqual(expectedProduct);
    expect(repositoryMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a product', async () => {
    const product: Product = { id: 1, name: 'Product 1', price: 12.5, type: 'perecedero', stores: [] };
    const updatedProduct: Product = { id: 1, name: 'Product 1 Updated', price: 12.5, type: 'perecedero', stores: [] };
    const updateProductDto: UpdateProductDto = { name: 'Product 1 Updated' };

    repositoryMock.merge.mockImplementation((product: Product, updateProductDto: UpdateProductDto) => {
      Object.assign(product, updateProductDto);
    });

    repositoryMock.findOneBy.mockResolvedValue(product);
    repositoryMock.save.mockResolvedValue(updatedProduct);

    const updated = await service.update(1, updateProductDto);

    expect(updated).toEqual(updatedProduct);
    expect(repositoryMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(repositoryMock.merge).toHaveBeenCalledTimes(1);
    expect(repositoryMock.merge).toHaveBeenCalledWith(product, updateProductDto);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(updatedProduct);
  });

  it('should remove a product', async () => {
    const product: Product = { id: 1, name: 'Product 1', price: 12.5, type: 'perecedero', stores: [] };

    repositoryMock.findOneBy.mockResolvedValue(product);

    await service.remove(1);

    expect(repositoryMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(product);
  });
});
