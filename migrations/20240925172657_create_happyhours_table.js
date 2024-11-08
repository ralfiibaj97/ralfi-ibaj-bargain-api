/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('happyhours', table => {
      table.increments('id').primary();
      table.integer('bar_id').unsigned().notNullable();
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.text('description').notNullable(); 
      table.integer('rating').defaultTo(0);
      table.foreign('bar_id').references('bars.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));   
  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export function down(knex) {
return knex.schema.dropTable('happyhours');
};
