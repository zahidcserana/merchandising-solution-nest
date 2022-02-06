import * as Knex from 'knex'

const tableName = 'images'

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments()
    t.integer('productId')
    t.integer('variantProductId')
    t.string('model')
    t.string('file')
    t.boolean('is_default')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName)
}
