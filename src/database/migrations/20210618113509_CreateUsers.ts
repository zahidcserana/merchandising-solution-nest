import * as Knex from 'knex'

const tableName = 'users'

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments()

    t.string('name').notNullable()

    t.string('email')
      .notNullable()
      .unique()

    t.string('username')
      .notNullable()
      .unique()

    t.string('password').notNullable()

    t.string('about')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName)
}
