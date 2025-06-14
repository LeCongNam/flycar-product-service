import { Column, ManyToOne, PrimaryColumn, VersionColumn } from 'typeorm';
import { PRODUCT_CONSTANTS } from '../constants';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { EntityDecorator } from './entity.decorator';

@EntityDecorator(PRODUCT_CONSTANTS.MODEL_NAME)
export class Product extends BaseEntity {
  constructor(partial: Partial<Product> | null = null) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', default: 0, nullable: false })
  stock: number;

  @Column({ type: 'json', nullable: true })
  imageUrls: string;

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  category: Category;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @VersionColumn({ type: 'int', default: 1 })
  version: number;
}
