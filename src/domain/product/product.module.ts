import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ProductElasticsearchService } from './product-elasticsearch.service';
import { ProductDashboardController } from './product.dashboard.controller';
import { ProductDashboardService } from './product.service';
import { ProductCreatedQueue } from './queue/product-created.queue';

@Module({
  imports: [BullModule.registerQueue({ name: 'productCreated' })],
  controllers: [ProductDashboardController],
  providers: [
    ProductDashboardService,
    ProductElasticsearchService,
    ProductCreatedQueue,
  ],
})
export class ProductModule {}
