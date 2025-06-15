import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LoggerService } from '../../shared/logger.service';
import { Mapping } from './elasticsearch.type';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  private readonly _logger = new LoggerService(SearchService.name);

  async search(
    index: string,
    query: any,
    pagination?: ESPagination, // Default size and from,
  ): Promise<{ data: any; total: number }> {
    try {
      const { size, from } = pagination || { size: 10, from: 0 };

      const response = await this.elasticsearchService.search({
        index,
        query,
        size,
        from,
      });

      return {
        data: response.hits.hits.map((hit) => hit._source),
        total: response?.hits?.total?.['value'] || 0,
      };
    } catch (error) {
      this._logger.error('Elasticsearch search error:', error);
      throw error;
    }
  }

  async indexDocument(index: string, id: string, document: any): Promise<void> {
    try {
      await this.elasticsearchService.index({
        index,
        id,
        body: document,
      });
      this._logger.log(
        `Document indexed successfully in ${index} with ID ${id}`,
      );
    } catch (error) {
      this._logger.error('Elasticsearch index error:', error);
      throw error;
    }
  }

  async putMapping<T>(index: string, mapping: Mapping<T>): Promise<void> {
    try {
      await this.elasticsearchService.indices.putMapping({
        index,
        body: mapping,
      });
      this._logger.log(`Mapping updated successfully for index ${index}`);
    } catch (error) {
      this._logger.error('Elasticsearch put mapping error:', error);
      throw error;
    }
  }

  async deleteDocument(index: string, id: string): Promise<void> {
    try {
      await this.elasticsearchService.delete({
        index,
        id,
      });
      this._logger.log(
        `Document deleted successfully from ${index} with ID ${id}`,
      );
    } catch (error) {
      this._logger.error('Elasticsearch delete error:', error);
      throw error;
    }
  }

  async updateDocument(
    index: string,
    id: string,
    document: any,
  ): Promise<void> {
    try {
      await this.elasticsearchService.update({
        index,
        id,
        body: {
          doc: document,
        },
      });
      this._logger.log(
        `Document updated successfully in ${index} with ID ${id}`,
      );
    } catch (error) {
      this._logger.error('Elasticsearch update error:', error);
      throw error;
    }
  }

  async bulkIndex(index: string, documents: any[]): Promise<void> {
    try {
      const body = documents.flatMap((doc) => [
        { index: { _index: index, _id: doc.id } },
        doc,
      ]);
      await this.elasticsearchService.bulk({ body });
      this._logger.log(
        `Bulk indexed ${documents.length} documents in ${index}`,
      );
    } catch (error) {
      this._logger.error('Elasticsearch bulk index error:', error);
      throw error;
    }
  }
}

type ESPagination = { size: number; from: number };
