import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('os', table => {
    table.integer('osId').notNullable();
    table.dateTime('osDateInit').notNullable();
    table.string('osDescription').notNullable();
    table.date('osDateFinal');
    table.integer('osTypeId').notNullable();
    table.integer('osStateId').notNullable();
    table.string('loginName').notNullable();
    table.foreign('osTypeId').references('osTypeId').inTable('osType');
    table.foreign('osStateId').references('osStateId').inTable('osState');
    table.foreign('loginName').references('loginName').inTable('users');
    table.primary(['osId', 'osDateInit']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('os');
}
