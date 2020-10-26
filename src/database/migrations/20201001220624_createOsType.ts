import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('osType', table => {
    table.integer('osTypeId').primary();
    table.string('typeName').notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('osType');
}
