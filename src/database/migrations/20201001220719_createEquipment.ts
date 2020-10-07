import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipment', function (table) {
    table.string('equipmentSerialNumber').primary();
    table.string('equipmentName').notNullable();
    table.integer('localId').notNullable();
    table.foreign('localId').references('localId').inTable('local');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('equipment');
}
