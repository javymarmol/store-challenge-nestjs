import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
