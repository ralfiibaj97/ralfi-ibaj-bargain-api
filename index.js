import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import barRoutes from './routes/bar-route.js';
import happyHourRoutes from './routes/happyhour-route.js';

let {PORT} = process.env;
PORT = PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/bars', barRoutes);
app.use('/happyhours', happyHourRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});