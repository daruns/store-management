import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = "stores"
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('name', 255);
    table.string('logo', 255);
    table.string('phoneNumber', 255);
    table.integer('userId')
    .index()
    .unsigned()
    .references('id')
    .inTable('users');

    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.dropTableIfExists(tableName);
}
