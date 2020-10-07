import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('osRegisters', function (table) {
    table.integer('osId').notNullable();
    table.dateTime('osDateInit').notNullable();
    table.dateTime('osRegisterDate').notNullable();
    table.string('loginName').notNullable();
    table.string('osRegisterDescription').notNullable();
    table.primary(['osId', 'osDateInit', 'osRegisterDate', 'loginName']);
    table
      .foreign(['osId', 'osDateInit'])
      .references(['osId', 'osDateInit'])
      .inTable('os');
    table.foreign('loginName').references('loginName').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('osRegisters');
}
