import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('points', table =>{
        table.increments('idpoint').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatshapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('points');
}