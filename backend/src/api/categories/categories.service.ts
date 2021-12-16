import { Injectable, Inject } from '@nestjs/common';
import { CategoryModel } from 'src/database/models/category.model';
import { ModelClass } from 'objection';
import { StoresService } from '../stores/stores.service';
import { FileParamDto, FileUploadService } from 'src/app/app.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoryModel') private modelClass: ModelClass<CategoryModel>,
    @Inject('StoresService') private storeSerive: StoresService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // category list
  async findAll(): Promise<ResponseData> {
    const categories = await this.modelClass.query()
    .select('name')
    .select('logo')
    .select('categories.id')
    .select('categories.createdAt')
    .withGraphFetched({
      products:{}
    })
    return {
      success: true,
      message: 'Category details fetch successfully.',
      data: categories,
    };
  }

  // find one category info by categoryId
  async findById(id: number): Promise<ResponseData> {
    const category = await this.modelClass
      .query()
      .select('name')
      .select('logo')
      .select('categories.id')
    .select('categories.createdAt')
    .findById(id)
      .withGraphFetched({
        products: {}
      })  
    if (category) {
      return {
        success: true,
        message: 'Category details fetch successfully.',
        data: category,
      };
    } else {
      return {
        success: false,
        message: 'No category details found.',
        data: {},
      };
    }
  }

  // Create category before save encrypt password
  async create(payload): Promise<ResponseData> {
    // restrict to the store that belongs to brand or user ## IMPORTANT TODO
    let categoryPayload = payload
    let preplogo: string = ""
    if (payload.logo) {
      const logoUploaded: FileParamDto = payload.logo
      const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "storeLogos")
      if (fileUploaded.success) {
        preplogo = fileUploaded.data.key
        console.log(fileUploaded)
      } else return fileUploaded
    }

    const storeFnd = await this.storeSerive.findById(categoryPayload.storeId)
    if (!storeFnd.success) {
      return {
        success: false,
        message: 'Store doesnt exist.',
        data: {},
      };
    }
    const identifiers = await this.modelClass.query().insert({
      name: categoryPayload.name,
      logo: preplogo,
      storeId: categoryPayload.storeId
    });
    const createCategory = await this.modelClass.query().findById(identifiers.id);
    console.log(createCategory)
    return {
      success: true,
      message: 'Category created successfully.',
      data: createCategory,
    };
  }

  async update(payload): Promise<ResponseData> {
    const categoryPayload = payload
    const category = await this.modelClass.query()
    .findById(categoryPayload.id);
    if (category) {
      let preplogo: string = category.logo
      if (payload.logo) {
        const logoUploaded: FileParamDto = payload.logo
        const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "storeLogos")
        if (fileUploaded.success) {
          preplogo = fileUploaded.data.key
          console.log(fileUploaded)
        } else return fileUploaded
      }

      if (categoryPayload.storeId) {
        const storeFnd = await this.storeSerive.findById(categoryPayload.storeId)
        console.log(storeFnd)
        if (!storeFnd.success) {
          return {
            success: false,
            message: 'Store doesnt exist.',
            data: {},
          };
        }
      }

      console.log(categoryPayload)
      const updatedCategory = await this.modelClass
        .query()
        .update({
          name: categoryPayload.name ? categoryPayload.name : category.name,
          logo: preplogo,
          storeId: categoryPayload.storeId ? categoryPayload.storeId : category.storeId,
        })
        .where({ id: categoryPayload.id });
      return {
        success: true,
        message: 'Category details updated successfully.',
        data: updatedCategory,
      };
    } else {
      return {
        success: false,
        message: 'No category found.',
        data: {},
      };
    }
  }

  // Delete category
  async deleteById(categoryId: number): Promise<ResponseData> {
    await this.modelClass.raw('SET FOREIGN_KEY_CHECKS = 0');
    const categories = await this.modelClass.query()
      .delete()
      .where({
        id: categoryId
      });
      await this.modelClass.raw('SET FOREIGN_KEY_CHECKS = 1');
    if (categories) {
      return {
        success: true,
        message: 'Category deleted successfully.',
        data: categories,
      };
    } else {
      return {
        success: false,
        message: 'No category found.',
        data: {},
      };
    }
  }
}
