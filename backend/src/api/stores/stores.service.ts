import { Injectable, Inject } from '@nestjs/common';
import { StoreModel } from 'src/database/models/store.model';
import { ModelClass } from 'objection';
import { FileParamDto, FileUploadService, ResponseData } from 'src/app/app.service';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @Inject('StoreModel') private modelClass: ModelClass<StoreModel>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // store list
  async findAll(): Promise<ResponseData> {
    const stores = await this.modelClass
    .query()
    .select('name')
    .select('logo')
    .select('stores.id')
    .select('stores.createdAt')
    .withGraphFetched({
      categories: {
      },
    });
    return {
      success: true,
      message: 'Store details fetch successfully.',
      data: stores,
    };
  }

  // find one store info by id
  async findById(id: number): Promise<ResponseData> {
    const store = await this.modelClass
      .query()
      .select('name')
      .select('logo')
      .select('stores.id')
      .select('stores.createdAt')
      .findById(id)
      .withGraphFetched({
        categories: {
        },
      });
    if (store) {
      return {
        success: true,
        message: 'Store details fetch successfully.',
        data: store,
      };
    } else {
      return {
        success: false,
        message: 'No store details found.',
        data: {},
      };
    }
  }

  // Create store
  async create(payload:CreateStoreDto): Promise<ResponseData> {
    let preplogo: string = ""
    if (payload.logo) {
      const logoUploaded: FileParamDto = payload.logo
      const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "storeLogos")
      if (fileUploaded.success) {
        preplogo = fileUploaded.data.key
        console.log(fileUploaded)
      } else return fileUploaded
    }
    let newparamspayload = {
      name : payload.name,
      phoneNumber : payload.phoneNumber,
      logo: preplogo,
    }
    var createdStore = await this.modelClass.query().insert(newparamspayload)
    .catch(() => {    return {
        success: false,
        message: 'something went wrong while adding store',
        data: {},
      };  
    })
    return {
      success: createdStore ? true : false,
      message: createdStore ? 'Store created successfully.' : 'Store couldnt be added!',
      data: createdStore,
    };  
  }

  async update(payload: UpdateStoreDto): Promise<ResponseData> {
    const store = await this.modelClass.query()
    .findById(payload.id);
    if (store) {
      let preplogo: string = store.logo
      if (payload.logo) {
        const logoUploaded: FileParamDto = payload.logo
        const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "storeLogos")
        if (fileUploaded.success) {
          preplogo = fileUploaded.data.key
          console.log(fileUploaded)
        } else return fileUploaded
      }
      console.log(payload)
      const updatedStore = await this.modelClass
      .query()
      .update({
        name: payload.name ? payload.name : store.name,
        logo: preplogo,        
        phoneNumber: payload.phoneNumber ? payload.phoneNumber : store.phoneNumber,
      })
      .where({ id: payload.id });
      return {
        success: true,
        message: 'Store details updated successfully.',
        data: updatedStore,
      };
    } else {
      return {
        success: false,
        message: 'No store found.',
        data: {},
      };
    }
  }

  // Delete store
  async deleteById(payload: {id: number}): Promise<ResponseData> {
    const storeDeleted = await this.modelClass
      .query()
      .findOne({
        id: payload.id,
      })
      .delete();
    if (storeDeleted) {
      return {
        success: true,
        message: 'Store deleted successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'No store found.',
        data: {},
      };
    }
  }
}
