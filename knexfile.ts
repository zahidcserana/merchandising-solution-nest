import { knexSnakeCaseMappers } from 'objection'

module.exports = {
  client: 'pg',
  connection: {
    database: 'account',
    user: 'dbuser',
    password: null,
  },
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migration.stub',
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/seed.stub',
  },
  ...knexSnakeCaseMappers(),
}
