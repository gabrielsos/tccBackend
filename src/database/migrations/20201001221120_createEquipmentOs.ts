import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipmentOs', function (table) {
    table.string('equipmentSerialNumber').notNullable();
    table.integer('osId').notNullable();
    table.dateTime('osDateInit').notNullable();
    table
      .foreign(['osId', 'osDateInit'])
      .references(['osId', 'osDateInit'])
      .inTable('os');
    table
      .foreign('equipmentSerialNumber')
      .references('equipmentSerialNumber')
      .inTable('equipment');
    table.primary(['osId', 'osDateInit', 'equipmentSerialNumber']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('equipmentOs');
}
