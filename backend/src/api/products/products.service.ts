import { Injectable, Inject } from '@nestjs/common';
import { ProductModel } from 'src/database/models/product.model';
import { ModelClass } from 'objection';
import { CategoriesService } from '../categories/categories.service';
import { FileParamDto, FileUploadService } from 'src/app/app.service';
import { StoresService } from '../stores/stores.service';
import { CreateProductDto } from './dto/create-product.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductModel') private modelClass: ModelClass<ProductModel>,
    private storeService: StoresService,
    private categoryService: CategoriesService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // product list
  async findAll(): Promise<ResponseData> {
    const products = await this.modelClass.query()
    .select('name')
    .select('logo')
    .select('price')
    .select('size')
    .select('categoryId')
    .select('storeId')
    .select('products.id')
    .select('products.createdAt')
    return {
      success: true,
      message: 'Product details fetch successfully.',
      data: products,
    };
  }

  // find one product info by productId
  async findById(id: number): Promise<ResponseData> {
    const product = await this.modelClass
      .query()
      .select('name')
      .select('logo')
      .select('price')
      .select('size')
      .select('categoryId')
      .select('storeId')
      .select('products.id')
      .select('products.createdAt')
      .findById(id)
    if (product) {
      return {
        success: true,
        message: 'Product details fetch successfully.',
        data: product,
      };
    } else {
      return {
        success: false,
        message: 'No product details found.',
        data: {},
      };
    }
  }

  // Create product before save encrypt password
  async create(payload): Promise<ResponseData> {
    // restrict to the product or user ## IMPORTANT TODO
    console.log(payload)
    let preplogo: string = ""
    if (payload.logo) {
      const logoUploaded: FileParamDto = payload.logo
      const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "productLogos")
      if (fileUploaded.success) {
        preplogo = fileUploaded.data.key
        console.log(fileUploaded)
      } else return fileUploaded
    }

    const categoryFnd = await this.categoryService.findById(payload.categoryId)
    if (!categoryFnd.success) {
      return {
        success: false,
        message: 'Category doesnt exist.',
        data: {},
      };
    }
    if (payload.storeId) {
      const storeFnd = await this.storeService.findById(payload.storeId)
      if (!storeFnd.success) {
        return {
          success: false,
          message: 'Store doesnt exist.',
          data: {},
        };
      }
    } else {
      payload.storeId = categoryFnd.data.storeId
    }
    const identifiers = await this.modelClass.query().insert({
      name: payload.name,
      price: payload.price,
      size: payload.size?.toLowerCase(),
      currency: payload.currency?.toLowerCase(),
      categoryId: payload.categoryId,
      storeId: payload.storeId ? payload.storeId : null,
      logo: preplogo,
      expireAt: payload.expiredAt,
    });
    const createProduct = await this.modelClass.query().findById(identifiers.id);
    return {
      success: true,
      message: 'Product created successfully.',
      data: createProduct,
    };
  }

  async update(payload): Promise<ResponseData> {
    const productPayload = payload
    const product = await this.modelClass.query()
    .findById(productPayload.id);
    if (product) {
      let preplogo: string = product.logo
      if (payload.logo) {
        const logoUploaded: FileParamDto = payload.logo
        const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "productLogos")
        if (fileUploaded.success) {
          preplogo = fileUploaded.data.key
          console.log(fileUploaded)
        } else return fileUploaded
      }
      console.log(payload)

      if (productPayload.categoryId) {
        const productFnd = await this.categoryService.findById(productPayload.categoryId)
        console.log(productFnd)
        if (!productFnd.success) {
          return {
            success: false,
            message: 'Category doesnt exist.',
            data: {},
          };
        }
        productPayload.storeId = productFnd.data.storeId
      }

      const updatedProduct = await this.modelClass
        .query()
        .update({
          name: productPayload.name ? productPayload.name : product.name,
          size: productPayload.size ? productPayload.size : product.size?.toLowerCase(),
          price: productPayload.price ? productPayload.price : product.price,
          currency: productPayload.currency ? productPayload.currency : product.currency?.toLowerCase(),
          expireAt: productPayload.expireAt ? productPayload.expireAt : product.expireAt,
          logo: preplogo,
          categoryId: productPayload.categoryId ? productPayload.categoryId : product.categoryId,
          storeId: productPayload.storeId ? productPayload.storeId : product.storeId,
        })
        .where({ id: productPayload.id });
      return {
        success: true,
        message: 'Product details updated successfully.',
        data: updatedProduct,
      };
    } else {
      return {
        success: false,
        message: 'No product found.',
        data: {},
      };
    }
  }

  // Delete product
  async deleteById(productId: number): Promise<ResponseData> {
    const categories = await this.modelClass.query()
      .delete()
      .where({
        id: productId
      });

    if (categories) {
      return {
        success: true,
        message: 'Product deleted successfully.',
        data: categories,
      };
    } else {
      return {
        success: false,
        message: 'No product found.',
        data: {},
      };
    }
  }
}
