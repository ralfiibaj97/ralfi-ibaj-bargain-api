/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

export async function seed(knex) {
  await knex('happyhours').del();
  await knex('happyhours').insert([
    {
      id: 1,
      bar_id: 1,
      start_time: '17:00:00',
      end_time: '19:00:00',
      description: '$5 beers and $7 wines',
      rating: 4
    },
    {
      id: 2,
      bar_id: 2,
      start_time: '18:00:00',
      end_time: '20:00:00',
      description: '$6 cocktails and $8 beers',
      rating: 5
    }
  ]);
}
   