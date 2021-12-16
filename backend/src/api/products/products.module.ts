import { Module } from '@nestjs/common';
import { FileUploadService } from 'src/app/app.service';
import { CategoriesModule } from '../categories/categories.module';
import { CategoriesService } from '../categories/categories.service';
import { StoresModule } from '../stores/stores.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [StoresModule,CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService,CategoriesService, FileUploadService],
  exports: [ProductsService]
})
export class ProductsModule {}
