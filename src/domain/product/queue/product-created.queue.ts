import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Product } from '../../../entities/product.entity';
import { ProductElasticsearchService } from '../product-elasticsearch.service';

@Processor('productCreated', { concurrency: 1 })
@Injectable()
export class ProductCreatedQueue extends WorkerHost {
  private _logger = new Logger(ProductCreatedQueue.name);

  constructor(
    private readonly prdElasticsearchService: ProductElasticsearchService,
  ) {
    super();
  }

  async process(job: Job<Product>): Promise<any> {
    this._logger.log(`Processing job ${job.id} for product ${job.data.name}`);
    try {
      const product = job.data;
      await this.prdElasticsearchService.indexProduct(job.data);
      this._logger.log(`Product ${product.name} indexed successfully`);
    } catch (error) {
      this._logger.error(`Error indexing product ${job.data.name}:`, error);
      throw error;
    }
  }
}
