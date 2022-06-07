import * as Knex from 'knex';

const tableName = 'requisitions';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments();
    t.string('number').notNullable().unique();
    t.integer('customer_id');
    t.date('required_date');
    t.string('status');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
