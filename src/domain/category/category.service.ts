import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private _categoryRepo: CategoryRepository) {}

  async create(dto: CreateCategoryDto) {
    const oldCategory = await this._categoryRepo.findOneBy({ name: dto.name });
    if (oldCategory) {
      throw new HttpException(
        { message: 'Category with this name already exists' },
        HttpStatus.CONFLICT,
      );
    }

    return this._categoryRepo.create(dto);
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    // Implement find one logic
    return { id };
  }

  update(id: number, dto: UpdateCategoryDto) {
    // Implement update logic
    return { message: 'Category updated', id, dto };
  }

  remove(id: number) {
    // Implement remove logic
    return { message: 'Category removed', id };
  }
}
