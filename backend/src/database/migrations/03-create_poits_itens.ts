import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('point_items', table =>{
        table.increments('idpontitem').primary();
        table.string('idpoint').notNullable().references('idpont').inTable('points');
        table.string('iditem').notNullable().references('iditem').inTable('items');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('items');
}