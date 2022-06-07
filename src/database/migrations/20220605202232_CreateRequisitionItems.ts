import * as Knex from 'knex';

const tableName = 'requisition_items';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments();
    t.integer('requisition_id').notNullable();
    t.integer('product_id');
    t.integer('color_id');
    t.integer('size_id');
    t.integer('quantity');
    t.integer('status');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
