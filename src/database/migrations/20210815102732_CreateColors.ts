import * as Knex from 'knex';

const tableName = 'colors';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments();

    t.string('name').notNullable().unique();

    t.string('slug').notNullable().unique();

    t.boolean('deleted').defaultTo(false);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
