import * as Knex from 'knex'

const tableName = 'customers'

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments()
    t.string('name')
    t.string('phone')
    t.string('email')
    t.string('address')
    t.string('country')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName)
}
