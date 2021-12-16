import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'productAttachments'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.integer('attachmentId')
    .index()
    .unsigned()
    .references('id')
    .inTable('attachments');
    table.integer('productId')
    .index()
    .unsigned()
    .references('id')
    .inTable('products');

    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.dropTableIfExists(tableName);
}
