import * as Knex from 'knex'

const tableName = 'order_items'

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments()
    t.integer('order_id').notNullable()
    t.integer('product_id').notNullable()
    t.integer('quantity')
    t.integer('quantity_shipped')
    t.integer('price')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName)
}
