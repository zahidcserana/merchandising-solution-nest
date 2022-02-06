import * as Knex from 'knex'

const tableName = 'products'

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments()

    t.string('name')
      .notNullable()
      .unique()

    t.string('composition')
    t.string('barcode').unique()
    t.string('status')
    t.string('variants')
    t.json('colors')
    t.json('sizes')
    t.integer('price')
    t.integer('quantity')
    t.integer('po_quantity')
    t.integer('ready_quantity')
    t.integer('delivered_quantity')
    t.integer('category_id')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName)
}
