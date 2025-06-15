import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { SearchModule } from './elasticsearch/elasticsearch.module';

@Global()
@Module({
  imports: [SearchModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService, SearchModule],
})
export class CoreModule {}
