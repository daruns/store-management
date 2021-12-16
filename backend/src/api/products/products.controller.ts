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
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

// @UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  async findAll(@Request() req) {
    const products = await this.productsService.findAll();
    return products;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const product = await this.productsService.findById(id);
    return product;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor("logo"))
  async create(@Body() payload, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    payload.categoryId = payload.categoryId ? Number(payload.categoryId) : 0
    payload.storeId = payload.storeId ? Number(payload.storeId) : 0
    payload.price = payload.price ? Number(payload.price) : 0
    const createdProduct = await this.productsService.create(payload);
    return createdProduct
  }

  @Post('update')
  // update commnet on product
  @UseInterceptors(FileInterceptor("logo"))
  update(@Body() payload, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    payload.id = payload.id ? Number(payload.id) : 0
    payload.categoryId = payload.categoryId ? Number(payload.categoryId) : 0
    payload.storeId = payload.storeId ? Number(payload.storeId) : 0
    payload.price = payload.price ? Number(payload.price) : 0
    return this.productsService.update(payload);
  }

  @Post('delete')
  // delete product by id
  deleteById(@Body() payload, @Request() req) {
    return this.productsService.deleteById(payload.id);
  }
}
