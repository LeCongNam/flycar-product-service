import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryDashboardService {
  constructor(private _categoryRepo: CategoryRepository) {}

  async create(dto: CreateCategoryDto) {
    const oldCategory = await this._categoryRepo.findOneBy({ name: dto.name });
    if (oldCategory) {
      throw new HttpException(
        {
          message: 'Category with this name already exists',
          code: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }

    return this._categoryRepo.save(dto);
  }

  findAll() {
    return this._categoryRepo.findAndCount({});
  }

  findOne(id: string) {
    return this._categoryRepo.findOneBy({ id });
  }

  update(id: string, dto: UpdateCategoryDto) {
    const category = this._categoryRepo.findOneBy({ id });
    if (!category) {
      throw new HttpException(
        `Category with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    this._categoryRepo.update(id, dto);
    return this._categoryRepo.findOneBy({ id });
  }

  async remove(id: number) {
    await this._categoryRepo.softDelete(id);
  }
}
