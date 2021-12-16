import { Module } from '@nestjs/common';
import { FileUploadService } from 'src/app/app.service';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService, FileUploadService],
  exports: [StoresService, FileUploadService],
})
export class StoresModule {}
