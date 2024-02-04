import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'char', length: 3 })
  city: string;

  @Column({ type: 'varchar' })
  address: string;

  @ManyToMany(() => Product, (product) => product.stores)
  products: Product[];
}
