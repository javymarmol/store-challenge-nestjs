import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @ManyToMany(() => Store, (store) => store.products)
  @JoinTable({
    name: 'products_stores',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'store_id',
    },
  })
  stores: Store[];
}
