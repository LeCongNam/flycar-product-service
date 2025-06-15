import {
  Column,
  DeleteDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CATEGORY_CONSTANTS } from '../constants';
import { BaseEntity } from './base.entity';
import { EntityDecorator } from './entity.decorator';
import { Product } from './product.entity';

@EntityDecorator(CATEGORY_CONSTANTS.MODEL_NAME)
export class Category extends BaseEntity {
  constructor(partial: Partial<Category> | null = null) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null;

  @OneToMany(() => Product, (product) => product.category, {
    nullable: true,
  })
  products?: Product[];
}
