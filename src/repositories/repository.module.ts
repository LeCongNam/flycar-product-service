import { Global, Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';

const providers = [ProductRepository];

@Global()
@Module({
  providers,
  exports: providers,
})
export class RepositoryModule {}
