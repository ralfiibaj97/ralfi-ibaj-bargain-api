import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import barRoutes from './routes/bars-route.js';
import happyHourRoutes from './routes/happyhour-route.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/bars', barRoutes);
app.use('/happyhours', happyHourRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
