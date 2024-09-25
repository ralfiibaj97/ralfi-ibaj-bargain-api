import initKnex from 'knex';
import configuration from '../knexfile.js';
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
            message: 'Missing required information' 
        });
    }
        try {
            let bar = await knex('bars').where({ name, address }).first();
            
            if (!bar) {
                bar = await knex('bars').insert({ name, address, zipcode, image_url: image_url || '',
            });
        const newBarId = barData[0];
        bar = await knex('bars').where({ id: newBarId }).first();
            }

        const happyHourData = await knex('happy_hours').insert({
            bar_id: bar.id,
            start_time,
            end_time,
            description,
            rating: 0,
        });

        const newHappyHourId = happyHourData[0];
        const createdHappyHour = await knex('happy_hours').where({ id: newHappyHourId }).first();
        res.status(201).json(createdHappyHour);
        } catch (error) {
            res.status(500).json({
                message: `Cannot create your new hhapy hour: ${error.message}`
            });
        }
    };