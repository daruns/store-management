import { BaseModel } from './base.model';
import { Model } from 'objection';
import { StoreModel } from './store.model';
import ProductModel from './product.model';

const tableName = 'categories'
export class CategoryModel extends BaseModel {
  static tableName = tableName;

  name: string
  logo: string
  storeId: number
  brandCode: string

  store: StoreModel;
  products: ProductModel[];

  static relationMappings = {
    // list of all store on current user
    store: {
      modelClass: `${__dirname}/store.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.storeId`,
        to: 'stores.id',
      },
    },
    products: {
      modelClass: `${__dirname}/product.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'products.categoryId',
      },
    },
  };
}

export default CategoryModel
