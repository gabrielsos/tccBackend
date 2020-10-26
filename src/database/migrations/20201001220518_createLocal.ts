import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('local', table => {
    table.integer('localId').primary();
    table.string('localName').notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('local');
}
