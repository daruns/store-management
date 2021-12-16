import { Module } from '@nestjs/common';
import { FileUploadService } from 'src/app/app.service';
import { StoresModule } from '../stores/stores.module';
import { StoresService } from '../stores/stores.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [StoresModule],
  controllers: [CategoriesController],
  providers: [CategoriesService,StoresService, FileUploadService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
