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
        "https://cdn0.weddingwire.com/vendor/153261/3_2/960/jpg/370365020-17999112710030534-1838719400924629580-n_51_2162351-169902196287116.jpeg",
      zipcode: "10016",
    },
    {
      id: 2,
      name: "The Winslow",
      address: "243 E 14th St, New York, NY 10003",
      image_url:
        "https://www.thewinslownyc.com/wp-content/uploads/2019/03/IMG_20190326_112942_01-1.jpg",
      zipcode: "10003",
    },
  ]);
}
