import { BaseModel } from './base.model';
import { Model } from 'objection';
import { Exclude } from "class-transformer";
import { BrandModel } from './brand.model';
import StoreModel from './store.model';

const tbName = 'users'
export class UserModel extends BaseModel {
  static tableName = tbName;
  username: string
  email: string
  @Exclude({ toPlainOnly: true })
  password: string
  name: string
  phoneNumber: string
  avatar: string
  userType: string
  department: string
  reportsTo: string
  activationToken: string
  activationTokenExpire: Date
  activatedAt: Date
  passwordResetToken: string
  passwordResetTokenExpire: Date
  lastResetAt: Date
  userId: number
  brandCode: string
  deleted: number
  status: string

  user: UserModel;
  users: UserModel[];
  brand: BrandModel;
  stores: StoreModel[];

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.userId`,
        to: `${tbName}.id`,
      },
    },
    users: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: `${tbName}.userId`,
      },
    },
    brand: {
      modelClass: `${__dirname}/brand.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.brandCode`,
        to: 'brands.brandCode',
      },
    },
    stores: {
      modelClass: `${__dirname}/store.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'stores.userId',
      },
    },
  };
}

export default UserModel
