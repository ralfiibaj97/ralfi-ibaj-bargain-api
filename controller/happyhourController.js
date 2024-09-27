import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const postHappyHour = async (req, res) => {
  const {
    name,
    address,
    zipcode,
    image_url,
    start_time,
    end_time,
    description,
  } = req.body;
  if (
    !name ||
    !address ||
    !zipcode ||
    !image_url ||
    !start_time ||
    !end_time ||
    !description
  ) {
    return res.status(400).json({
      message: "Missing required information",
    });
  }
  try {
    let bar = await knex("bars").where({ name, address }).first();

    if (!bar) {
      bar = await knex("bars").insert({
        name,
        address,
        zipcode,
        image_url: image_url || "",
      });
      const newBarId = barData[0];
      bar = await knex("bars").where({ id: newBarId }).first();
    }

    const happyHourData = await knex("happyhours").insert({
      bar_id: bar.id,
      start_time,
      end_time,
      description,
      rating: 0,
    });

    const newHappyHourId = happyHourData[0];
    const createdHappyHour = await knex("happyhours")
      .where({ id: newHappyHourId })
      .first();
    res.status(201).json(createdHappyHour);
  } catch (error) {
    res.status(500).json({
      message: `Cannot create your new hapy hour: ${error.message}`,
    });
  }
};

export const getHappyHourByZipcode = async (req, res) => {
  const { zipcode } = req.params;

  if (!zipcode) {
    return res.status(400).json({
      message: "Missing required zipcode",
    });
  }
  try {
    const happyHours = await knex("happyhours")
      .join("bars", "bars.id", "=", "happyhours.bar_id")
      .where("bars.zipcode", zipcode)
      .select(
        "bars.name",
        "bars.address",
        "bars.image_url",
        "happyhours.start_time",
        "happyhours.end_time",
        "happyhours.description"
      );
    if (happyHours.length === 0) {
      return res.status(404).json({
        message: "No Happy Hour found for this specific zipcode",
      });
    }
    res.status(200).json(happyHours);
  } catch (error) {
    res.status(500).json({
      message: `Can't retrieve happy hours: ${error.message}`,
    });
  }
};

export const getAllHappyHours = async (req, res) => {
  try {
    const happyHours = await knex("happyhours")
      .join("bars", "bars.id", "=", "happyhours.bar_id")
      .select(
        "happyhours.*",
        "bars.name as bar_name",
        "bars.address as bar_address"
      );
    res.json(happyHours);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error fetching all happy hours",
        error: error.message,
      });
  }
};
