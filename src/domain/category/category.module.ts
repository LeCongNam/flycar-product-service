import { Module } from '@nestjs/common';
import { CategoryDashboardController } from './category.dashboard.controller';
import { CategoryDashboardService } from './category.dashboard.service';
@Module({
  controllers: [CategoryDashboardController],
  providers: [CategoryDashboardService],
})
export class CategoryModule {}
