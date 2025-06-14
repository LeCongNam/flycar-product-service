import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(private _dataSource: DataSource) {
    super(Product, _dataSource);
  }
}
