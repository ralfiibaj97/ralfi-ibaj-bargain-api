import express from 'express';
import * as happyhourController from '../controller/happyhourController.js';
const router = express.Router();

router.post("/", happyhourController.postHappyHour)
router.get("/:zipcode", happyhourController.getHappyHourByZipcode);

export default router;
