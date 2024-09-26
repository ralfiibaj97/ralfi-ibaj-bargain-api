/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('bars', table => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.text('address').notNullable();
        table.text('image_url').notNullable();
        table.text('zipcode', 10).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));   
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('bars');
};
