import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

let {PORT} = process.env;
PORT = PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});