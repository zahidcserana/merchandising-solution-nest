import * as Knex from 'knex'

const tableName = 'variant_products'

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments()
    t.integer('product_id')
    t.integer('color_id')
    t.integer('size_id')
    t.integer('quantity')
    t.integer('po_quantity')
    t.integer('ready_quantity')
    t.integer('delivered_quantity')
    t.boolean('is_default')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName)
}
