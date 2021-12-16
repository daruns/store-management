import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = "products"
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
	table.string('name', 255);
	table.string('logo', 255);
	table.integer('price');
	table.string('size')
	table.string('currency');
	table.dateTime('expireAt');
  table.integer('categoryId')
  .index()
  .unsigned()
  .references('id')
  .inTable('categories')
  .onDelete('CASCADE');
  table.integer('storeId')
  .index()
  .unsigned()
  .references('id')
  .inTable('stores')
  .onDelete('CASCADE');


    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.dropTableIfExists(tableName);
}
