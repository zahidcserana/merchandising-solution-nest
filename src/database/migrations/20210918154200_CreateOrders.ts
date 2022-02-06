import * as Knex from 'knex'

const tableName = 'orders'

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments()
    t.integer('total')
    t.integer('sub_total')
    t.integer('discount')
    t.integer('tax')
    t.integer('customer_id')
    t.integer('item_count')
    t.date('ordered_at')
    t.date('required_at')
    t.string('number')
      .notNullable()
      .unique()

    t.string('notes')
    t.string('status')
    t.boolean('is_cancelled')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName)
}
