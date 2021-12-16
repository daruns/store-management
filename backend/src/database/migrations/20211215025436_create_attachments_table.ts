import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = "attachments"
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('name');
    table.string('description');
    table.string('key');
    table.string('url').index().unique();
    table.string('contentType');
    table.integer('size');
    table.string('brandCode');

    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.dropTableIfExists(tableName);
}
