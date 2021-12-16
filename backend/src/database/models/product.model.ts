import { BaseModel } from './base.model';
import { Model } from 'objection';
import AttachmentModel from './attachment.model';
import StoreModel from './store.model';
import CategoryModel from './category.model';

const tableName = 'products'
export class ProductModel extends BaseModel {
  static tableName = tableName;

  name: string
  logo: string
  price: number
  size: string
  currency: string
  expireAt: Date
  categoryId: number
  storeId: number

  store: StoreModel;
  category: CategoryModel;
  attachments: AttachmentModel[]
  static relationMappings = {
    // list of all client on current user
    store: {
      modelClass: `${__dirname}/store.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.storeId`,
        to: 'stores.id',
      },
    },
    // list of all client on current user
    category: {
      modelClass: `${__dirname}/category.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.categoryId`,
        to: 'categories.id',
      },
    },
    attachments: {
      modelClass: `${__dirname}/attachment.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'productAttachments.productId',
          to: 'productAttachments.attachmentId'
        },
        to: 'attachments.id',
      },
    },
  };
}

export default ProductModel
