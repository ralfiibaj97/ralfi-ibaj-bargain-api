import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getAllBars = async (_req, res) => {
  try {
    const data = await knex("bars").select(
      "id",
      "name",
      "address",
      "image_url"
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching bars: ${error.message}`,
    });
  }
};

export const getBarById = async (req, res) => {
  const { id } = req.params;

  try {
    const bar = await knex("bars").where({ id }).first();
    if (!bar) {
      return res.status(404).json({
        message: `Bar ID: ${id} not found`,
      });
    }

    const happyHours = await knex("happyhours").where({ bar_id: id });

    res.status(200).json({
      bar,
      happyHours,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching bar: ${error.message}`,
    });
  }
};

export const getBarsByZipcode = async (req, res) => {
  const { zipcode } = req.params;

  try {
    const bars = await knex("bars").where({ zipcode });

    if (bars.length === 0) {
      return res.status(404).json({
        message: `No bars found for zipcode: ${zipcode}`,
      });
    }

    res.status(200).json(bars);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching bars by zipcode: ${error.message}`,
    });
  }
};

export const addBar = async (req, res) => {
  const { name, address, zipcode, image_url } = req.body;

  if (!name || !address || !zipcode || !image_url) {
    return res.status(400).json({
      message: "Please fill out ALL of the fields!",
    });
  }

  try {
    const data = await knex("bars").insert({
      name,
      address,
      zipcode,
      image_url,
    });

    const newBarId = data[0];
    const createdBar = await knex("bars").where({ id: newBarId }).first();

    res.status(201).json(createdBar);
  } catch (error) {
    res.status(500).json({
      message: `Error adding new bar: ${error.message}`,
    });
  }
};

export const deleteBar = async (req, res) => {
  const { id } = req.params;

  try {
    const bar = await knex("bars").where({ id }).first();
    if (!bar) {
      return res.status(404).json({
        message: `Bar ID: ${id} not found`,
      });
    }

    await knex("bars").where({ id }).del();
    res.status(200).json({
      message: `Bar ID: ${id} has been deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deleting bar: ${error.message}`,
    });
  }
};
