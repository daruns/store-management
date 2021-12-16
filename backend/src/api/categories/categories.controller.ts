import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Post,
  UseGuards,
  Req,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

// @UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const categories = await this.categoriesService.findAll();
    return categories;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const category = await this.categoriesService.findById(id);
    return category;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor("logo"))
  async create(@Body() payload: CreateCategoryDto, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    payload.storeId = payload.storeId ? Number(payload.storeId) : 0
    console.log(payload)
    const createdCategory = await this.categoriesService.create(payload);
    return createdCategory
  }

  @Post('update')
  // update commnet on category
  @UseInterceptors(FileInterceptor("logo"))
  update(@Body() payload, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    payload.id = payload.id ? Number(payload.id) : 0
    payload.storeId = payload.storeId ? Number(payload.storeId) : 0
    return this.categoriesService.update(payload);
  }

  @Post('delete')
  // delete category by id
  deleteById(@Body() payload, @Request() req) {
    return this.categoriesService.deleteById(payload.id);
  }
}
