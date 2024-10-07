import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const postHappyHour = async (req, res) => {
  const { barId } = req.params;
  const { start_time, end_time, description } = req.body;

  if (!barId || !start_time || !end_time || !description) {
    return res.status(400).json({
      message: "Please fill out ALL of the fields!",
    });
  }

  try {
    const data = await knex("happyhours").insert({
      bar_id: barId,
      start_time,
      end_time,
      description,
    });

    const newHappyHourId = data[0];
    const createdHappyHour = await knex("happyhours")
      .where({ id: newHappyHourId })
      .first();

    res.status(201).json(createdHappyHour);
  } catch (error) {
    res.status(500).json({
      message: `Cannot create your new happy hour: ${error.message}`,
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
        message: `No Happy Hour found for zipcode: ${zipcode}`,
      });
    }

    res.status(200).json(happyHours);
  } catch (error) {
    res.status(500).json({
      message: `Cannot retrieve happy hours: ${error.message}`,
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

    res.status(200).json(happyHours);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching all happy hours: ${error.message}`,
    });
  }
};

export const updateHappyHour = async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, description } = req.body;

  if (!start_time && !end_time && !description) {
    return res.status(400).json({
      message:
        "Please provide at least one field to update",
    });
  }

  try {
    const existingHappyHour = await knex("happyhours").where({ id }).first();

    if (!existingHappyHour) {
      return res.status(404).json({
        message: `Happy Hour with ID: ${id} not found`,
      });
    }

    const updateData = {};
    if (start_time) updateData.start_time = start_time;
    if (end_time) updateData.end_time = end_time;
    if (description) updateData.description = description;

    const rowsAffected = await knex("happyhours")
      .where({ id })
      .update(updateData);

    if (!rowsAffected) {
      return res.status(400).json({
        message: "No changes were made to the happy hour.",
      });
    }

    const updatedHappyHour = await knex("happyhours").where({ id }).first();

    res.status(200).json(updatedHappyHour);
  } catch (error) {
    res.status(500).json({
      message: `Cannot update your happy hour: ${error.message}`,
    });
  }
};
