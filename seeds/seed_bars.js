/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("bars").del();

  await knex("bars").insert([
    {
      id: 1,
      name: "Bella Union",
      address: "400-11 3rd Avenue New York, NY 10016",
      image_url:
        "https://lh3.googleusercontent.com/p/AF1QipPxpFgL3eHNSZHwU7hWqIYwCen10DeXp-HqOhPR=s1360-w1360-h1020",
      zipcode: "10016",
    },
    {
      id: 2,
      name: "The Winslow",
      address: "243 E 14th St, New York, NY 10003",
      image_url:
        "https://lh3.googleusercontent.com/p/AF1QipOGnI4PGhHrXsWcaGDlvzsA50zOSCk6KV6kA83L=s1360-w1360-h1020",
      zipcode: "10003",
    },
    {
      id: 3,
      name: "The Snow",
      address: "244 E 14th St, New York, NY 10003",
      image_url:
        "https://lh3.googleusercontent.com/p/AF1QipOGnI4PGhHrXsWcaGDlvzsA50zOSCk6KV6kA83L=s1360-w1360-h1020",
      zipcode: "10003",
    }
  ]);
}
