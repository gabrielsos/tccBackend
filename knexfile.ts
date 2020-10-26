import path from 'path';

module.exports = {
  client: 'mysql',
  connection: {
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10372774',
    password: 'nVpA17xV5W',
    database: 'sql10372774',
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
};
