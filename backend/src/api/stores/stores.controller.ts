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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileParamDto } from "src/app/app.service";
// @UseGuards(JwtAuthGuard)
@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
  ) {}

  @Get()
  async findAll(@Request() req) {
    const stores = await this.storesService.findAll();
    return stores;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const store = await this.storesService.findById(id);
    return store;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor("logo"))
  async create(@Body() payload: CreateStoreDto, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    const createdStore = await this.storesService.create(payload);
    return createdStore
  }

  @Post('update')
  // update commnet on store
  @UseInterceptors(FileInterceptor("logo"))
  update(@Body() payload, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    payload.id = payload.id ? Number(payload.id) : 0
    return this.storesService.update(payload);
  }

  @Post('delete')
  // delete store by id
  deleteById(@Body() payload: {id: number}, @Request() req) {
    return this.storesService.deleteById(payload);
  }
}
