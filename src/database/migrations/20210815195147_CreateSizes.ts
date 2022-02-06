import * as Knex from 'knex'

const tableName = 'sizes';

export async function up (knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();

    t.string('name')
    .notNullable()
    .unique()

    t.string('slug')
    .notNullable()
    .unique()
  });
}

export async function down (knex: Knex) {
  return knex.schema.dropTable(tableName);
}
