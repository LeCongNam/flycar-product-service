import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseController } from '../../shared/base.controller';
import { CreateProductDto } from './dto/create-product.dto';
import { GetListProductDto } from './dto/get-list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDashboardService } from './product.service';
@Controller('dashboard/products')
export class ProductDashboardController extends BaseController {
  constructor(
    private readonly productDashboardService: ProductDashboardService,
  ) {
    super();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productDashboardService.create(createProductDto);
    return this.responseCustom(data);
  }

  @Get()
  async findAll(@Query() filter: GetListProductDto) {
    const { data, total } = await this.productDashboardService.findAll(filter);
    return this.responseCustom(data, { total });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productDashboardService.findOne(id);
    return this.responseCustom(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = await this.productDashboardService.update(
      id,
      updateProductDto,
    );
    return this.responseCustom(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productDashboardService.remove(id);
    return this.responseCustom(null, {
      message: 'Product removed successfully',
    });
  }
}
