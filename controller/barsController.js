import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getAllBars = async (req, res) => {
  try {
    const data = await knex("bars").select("name", "address", "image_url");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getBarById = async (req, res) => {
  try {
    const bar = await knex("bars").where({ id: req.params.id }).first();
    const happyHours = await knex("happyhours").where({ bar_id: req.params.id });

    if (!bar) {
      return res.status(404).json({ message: "Bar not found" });
    }
    res.json({
      bar,
      happyHours
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching bar", error: error.message });
  }
};



export const getBarsByZipcode = async (req, res) => {
  try {
    const { zipcode } = req.params;
    const bars = await knex("bars").where({ zipcode });
    if (bars.length) {
      res.json(bars);
    } else {
      res.status(404).json({ message: "No bars found for this zipcode" });
    }
  } catch (error) {
    console.error("Error fetching bars by zipcode: ", error);
    res.status(500).json({ message: "Error fetching bars by zipcode" });
  }
};

export const addBar = async (req, res) => {
  const { name, address, zipcode, image_url } = req.body;
  if (!name || !address || !zipcode || !image_url) {
    return res.status(400).json({
      message: "Missing required fields for creating a bar",
    });
  }

  try {
    const result = await knex("bars").insert({
      name,
      address,
      zipcode,
      image_url
    });
    const newBarId = result[0]; 

    res.status(201).json({ id: newBarId });
  } catch (error) {
    res.status(500).json({
      message: "Error adding new bar",
      error: error.message,
    });
  }
};



