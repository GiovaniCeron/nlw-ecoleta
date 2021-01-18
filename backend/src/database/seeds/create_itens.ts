import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        {title: 'Lâmpadas', image:'lampada.svg'},
        {title: 'Pilhas e Baterias', image:'baterias.svg'},
        {title: 'Papeis e Papelão', image:'papeis.svg'},
        {title: 'Residuos Eletronicos', image:'eletronicos.svg'},
        {title: 'Residuos Organicos', image:'organicos.svg'},
        {title: 'Oleo de Cozinha', image:'oleo.svg'},
    ])
}