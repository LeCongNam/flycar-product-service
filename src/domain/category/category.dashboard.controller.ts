import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BaseController } from '../../shared/base.controller';
import { CategoryDashboardService } from './category.dashboard.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('/dashboard/categories')
export class CategoryDashboardController extends BaseController {
  constructor(private readonly _categoryDbService: CategoryDashboardService) {
    super();
  }

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    const data = await this._categoryDbService.create(dto);

    return this.responseCustom(data);
  }

  @Get()
  async findAll() {
    const [data, total] = await this._categoryDbService.findAll();
    return this.responseCustom(data, {
      total,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this._categoryDbService.findOne(id);
    return this.responseCustom(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this._categoryDbService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this._categoryDbService.remove(+id);
    return this.responseCustom(null, {
      message: 'Category removed successfully',
    });
  }
}
