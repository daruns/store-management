import { Body, Controller, Get, Param, Post, Req, Request, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { AppService, FileUploadService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get('files/:key')
  async getHello(@Param('key') key, @Request() req, @Res() res) {
    
    const fileFnd = await this.fileUploadService.getFile(key)
    if (fileFnd.success) {
      return createReadStream(fileFnd.data).pipe(res)
    } else {
      res.status(404).send({success: false, message:"file not found", data: {}})
    }
  }
}
