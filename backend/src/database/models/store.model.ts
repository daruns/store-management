import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { CategoryModel } from "./category.model";
import ProductModel from './product.model';

const tableName = 'stores'
export class StoreModel extends BaseModel {
  static tableName = tableName;

  name: string
  logo: string
  phoneNumber: string
  userId: number

  user: UserModel;
  categories: CategoryModel[];
  products: ProductModel[];

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.userId`,
        to: 'users.id',
      },
    },
    categories: {
      modelClass: `${__dirname}/category.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'categories.storeId',
      },
    },
    products: {
      modelClass: `${__dirname}/product.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'products.storeId',
      },
    },
  };
}

export default StoreModel
