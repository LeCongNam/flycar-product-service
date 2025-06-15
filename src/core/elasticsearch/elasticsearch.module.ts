import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './SearchService.service';

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: 'http://localhost:9200',
      }),
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
