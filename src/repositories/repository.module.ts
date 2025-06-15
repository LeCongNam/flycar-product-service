import { Global, Module } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { ProductRepository } from './product.repository';

const providers = [ProductRepository, CategoryRepository];

@Global()
@Module({
  providers,
  exports: providers,
})
export class RepositoryModule {}
