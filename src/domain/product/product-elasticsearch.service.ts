import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { Injectable } from '@nestjs/common';
import { SearchService } from '../../core/elasticsearch/SearchService.service';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductElasticsearchService {
  private readonly _INDEX = 'products';

  constructor(private readonly searchService: SearchService) {}

  async indexProduct(product: Omit<Product, 'category'>): Promise<void> {
    try {
      await this.searchService.indexDocument(this._INDEX, product.id, {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images,
        thumbnail: product.thumbnail,
        // categoryId: product.category.id,
        isActive: product.isActive,
      });
    } catch (error) {
      console.error(`Error indexing product ${product.name}:`, error);
      throw error;
    }
  }

  async searchProducts(
    { skip, limit },
    filter: Partial<Product> = {},
  ): Promise<{ data: Product[]; total: number }> {
    try {
      const searchQuery: QueryDslQueryContainer = {};
      if (Object.keys(filter).length) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchQuery[key] = { match: { [key]: value } };
          }
        });
      } else {
        searchQuery.match_all = {};
      }

      const response = await this.searchService.search(
        this._INDEX,
        searchQuery,
        {
          size: limit,
          from: skip,
        },
      );
      return {
        data: response.data,
        total: response.total,
      };
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    // Implementation for deleting a product from Elasticsearch
  }

  async findOneById(productId: string): Promise<Product | null> {
    try {
      const query: QueryDslQueryContainer = {
        match: {
          // name: 'Awesome Rubber Sausages',
          id: '249bbac9-b6e3-41c2-9c17-bd1663fb0dac',
        },
      };
      const response = await this.searchService.search(this._INDEX, query);

      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error(`Error finding product by ID ${productId}:`, error);
      throw error;
    }
  }
}
