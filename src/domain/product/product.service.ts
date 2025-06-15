import { InjectQueue } from '@nestjs/bullmq';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Product } from '../../entities/product.entity';
import { CategoryRepository, ProductRepository } from '../../repositories';
import { BaseFilter } from '../../shared/base.filter';
import { CreateProductDto } from './dto/create-product.dto';
import { GetListProductDto } from './dto/get-list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductElasticsearchService } from './product-elasticsearch.service';

@Injectable()
export class ProductDashboardService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly _cateRepo: CategoryRepository,
    @InjectQueue('productCreated') private productQueue: Queue,
    private readonly prdSearchSvc: ProductElasticsearchService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    let product: any;

    await this.productRepository.executeTransaction(async (qr) => {
      const existingProduct = await this.productRepository
        .getRepository(qr)
        .findOneBy({
          name: createProductDto.name,
        });

      if (existingProduct) {
        throw new HttpException(
          { message: `Product ${createProductDto.name} is already exists ` },
          HttpStatus.CONFLICT,
        );
      }

      const newCategory = this._cateRepo.getRepository(qr).create({
        id: createProductDto.categoryId,
      });

      const oldCategory = await this._cateRepo.getRepository(qr).findOneBy({
        id: newCategory.categoryId,
      });

      if (!oldCategory) {
        throw new HttpException(
          {
            message: `Category with id ${createProductDto.categoryId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      product = await this.productRepository.getRepository(qr).save({
        ...createProductDto,
        images: createProductDto.images,
        category: newCategory,
      });
    });

    await this.productQueue.add('productCreated', product, {
      backoff: { delay: 5000, type: 'exponential' },
    });

    return product;
  }

  async findAll(
    filterDto: GetListProductDto,
  ): Promise<{ data: Product[]; total: number }> {
    const { limit, skip, filter } = new BaseFilter(filterDto);
    // return this.productRepository.findAndCount({
    //   where: filter,
    //   take: limit,
    //   skip,
    // });

    return this.prdSearchSvc.searchProducts({ skip, limit }, filter);
  }

  async findOne(id: string) {
    // return this.productRepository.findOneBy({ id });
    const product = await this.prdSearchSvc.findOneById(id);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(
        `Product with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.productRepository.softDelete(id);
  }
}
