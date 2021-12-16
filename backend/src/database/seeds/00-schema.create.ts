import { Logger } from '@nestjs/common';
import { StoreModel } from '../models/store.model';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { AttachmentModel } from '../models/attachment.model';
exports.seed = async knex => {
  Logger.log('Starting truncating tables');
  // set foreign key check false
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');

  if (await knex.schema.hasTable('stores') ) {
    await StoreModel.query(knex).truncate();
  }
  if (await knex.schema.hasTable('categories') ) {
    await CategoryModel.query(knex).truncate();
  }
  if (await knex.schema.hasTable('products') ) {
    await ProductModel.query(knex).truncate();
  }
  if (await knex.schema.hasTable('attachments') ) {
    await AttachmentModel.query(knex).truncate();
  }
  let stores = []
  stores.push (await StoreModel.query(knex).insert({"name": "Moderno","logo": "1ebadc2d-4b95-477e-8cba-d5ad57506592.jfif"}))
  stores.push (await StoreModel.query(knex).insert({"name": "Tommy","logo": "2a1e6377-8e99-4e58-918a-ad31673a6b6c.jfif"}))
  stores.push (await StoreModel.query(knex).insert({"name": "L&V","logo": "2f145fe7-0098-47ef-8516-2e5a227110f8.jfif"}))
  stores.push (await StoreModel.query(knex).insert({"name": "nakhsh","logo": "4cc3bbf6-01f6-4924-9cf5-d67f62cf343a.jfif"}))
  stores.push (await StoreModel.query(knex).insert({"name": "nike","logo": "542d3001-d50e-4cde-8ef6-cf5717fbe231.jfif"}))
  stores.push (await StoreModel.query(knex).insert({"name": "Skachars","logo": "7c1b6008-e136-4cea-a1b4-152465aa554f.jfif"}))
  stores.push (await StoreModel.query(knex).insert({"name": "addidas","logo": "2a114b5f-8a42-4f30-9777-caff91685caf.jfif"}))
  for (let i = 0; i < stores.length; i++) {
    let categories = []
    categories.push(await CategoryModel.query(knex).insert({storeId: stores[i].id,name:"Women",logo:"88617580-3c35-4c44-8ed8-b8adeceb487c.jfif"}))
    categories.push(await CategoryModel.query(knex).insert({storeId: stores[i].id,name:"Men",logo:"7c1b6008-e136-4cea-a1b4-152465aa554f.jfif"}))
    categories.push(await CategoryModel.query(knex).insert({storeId: stores[i].id,name:"Kids",logo:"2a114b5f-8a42-4f30-9777-caff91685caf.jfif"}))
    categories.push(await CategoryModel.query(knex).insert({storeId: stores[i].id,name:"Sport",logo:"4c38d256-7316-4b5d-a8fd-4c51c467ac02.jfif"}))
    for (let c = 0; c < categories.length;c++) {
      await ProductModel.query(knex).insert({storeId: stores[i].id,categoryId:categories[c].id,name:"Black-Sport medium", size:"m",price:33,logo:"7c1b6008-e136-4cea-a1b4-152465aa554f.jfif"})
      await ProductModel.query(knex).insert({storeId: stores[i].id,categoryId:categories[c].id,name:"Black-Sport", size:"s",price:43,logo:"7c1b6008-e136-4cea-a1b4-152465aa554f.jfif"})
      await ProductModel.query(knex).insert({storeId: stores[i].id,categoryId:categories[c].id,name:"Pink-Women", size:"l",price:53,logo:"2a1e6377-8e99-4e58-918a-ad31673a6b6c.jfif"})
      await ProductModel.query(knex).insert({storeId: stores[i].id,categoryId:categories[c].id,name:"orange-Kid", size:"xs",price:13,logo:"7c1b6008-e136-4cea-a1b4-152465aa554f.jfif"})
      await ProductModel.query(knex).insert({storeId: stores[i].id,categoryId:categories[c].id,name:"blue-Men", size:"xl",price:63,logo:"2a1e6377-8e99-4e58-918a-ad31673a6b6c.jfif"})
    }
  }
  await AttachmentModel.query(knex).insert({key: '1ebadc2d-4b95-477e-8cba-d5ad57506592.jfif', url: 'uploads/1ebadc2d-4b95-477e-8cba-d5ad57506592.jfif'})
  await AttachmentModel.query(knex).insert({key: '2f145fe7-0098-47ef-8516-2e5a227110f8.jfif', url: 'uploads/2f145fe7-0098-47ef-8516-2e5a227110f8.jfif'})
  await AttachmentModel.query(knex).insert({key: '4cc3bbf6-01f6-4924-9cf5-d67f62cf343a.jfif', url: 'uploads/4cc3bbf6-01f6-4924-9cf5-d67f62cf343a.jfif'})
  await AttachmentModel.query(knex).insert({key: '5e0ddb5d-28f5-4e8e-8c31-ccd9b76d190e.jfif', url: 'uploads/5e0ddb5d-28f5-4e8e-8c31-ccd9b76d190e.jfif'})
  await AttachmentModel.query(knex).insert({key: '59fc3d51-59ae-44ca-8170-5b00448d07b0.jfif', url: 'uploads/59fc3d51-59ae-44ca-8170-5b00448d07b0.jfif'})
  await AttachmentModel.query(knex).insert({key: '91a635db-6090-4ec2-a3a2-c312170cfdca.png', url: 'uploads/91a635db-6090-4ec2-a3a2-c312170cfdca.png'})
  await AttachmentModel.query(knex).insert({key: '1670a992-ff3b-41c8-85f0-5a8c3b72c668.png', url: 'uploads/1670a992-ff3b-41c8-85f0-5a8c3b72c668.png'})
  await AttachmentModel.query(knex).insert({key: '5683b18e-da7b-4ac4-b3b6-3ee5a62981a8.png', url: 'uploads/5683b18e-da7b-4ac4-b3b6-3ee5a62981a8.png'})
  await AttachmentModel.query(knex).insert({key: '88617580-3c35-4c44-8ed8-b8adeceb487c.jfif', url: 'uploads/88617580-3c35-4c44-8ed8-b8adeceb487c.jfif'})
  await AttachmentModel.query(knex).insert({key: 'a0d756d0-7bb6-41fc-b941-67f01e0b564d.jfif', url: 'uploads/a0d756d0-7bb6-41fc-b941-67f01e0b564d.jfif'})
  await AttachmentModel.query(knex).insert({key: 'a3ae8c25-4318-4793-9e56-b1d9c8027a65.png', url: 'uploads/a3ae8c25-4318-4793-9e56-b1d9c8027a65.png'})
  await AttachmentModel.query(knex).insert({key: '542d3001-d50e-4cde-8ef6-cf5717fbe231.jfif', url: 'uploads/542d3001-d50e-4cde-8ef6-cf5717fbe231.jfif'})
  await AttachmentModel.query(knex).insert({key: '2a114b5f-8a42-4f30-9777-caff91685caf.jfif', url: 'uploads/2a114b5f-8a42-4f30-9777-caff91685caf.jfif'})
  await AttachmentModel.query(knex).insert({key: '4c38d256-7316-4b5d-a8fd-4c51c467ac02.jfif', url: 'uploads/4c38d256-7316-4b5d-a8fd-4c51c467ac02.jfif'})
  await AttachmentModel.query(knex).insert({key: '7c1b6008-e136-4cea-a1b4-152465aa554f.jfif', url: 'uploads/7c1b6008-e136-4cea-a1b4-152465aa554f.jfif'})
  await AttachmentModel.query(knex).insert({key: '2a1e6377-8e99-4e58-918a-ad31673a6b6c.jfif', url: 'uploads/2a1e6377-8e99-4e58-918a-ad31673a6b6c.jfif'})
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
  // set foreign key check true

  Logger.log('Ending truncating tables');
};
