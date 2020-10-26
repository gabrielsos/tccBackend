import Knex from 'knex';

const db = Knex({
  client: 'mysql',
  connection: {
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10372774',
    password: 'nVpA17xV5W',
    database: 'sql10372774',
  },
  useNullAsDefault: true,
});

export default db;
