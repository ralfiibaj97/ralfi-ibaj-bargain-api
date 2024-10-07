import express from "express";
import * as happyhourController from "../controller/happyhourController.js";
const router = express.Router();

router.post("/:barId", happyhourController.postHappyHour);
router.get("/:zipcode", happyhourController.getHappyHourByZipcode);
router.get("/", happyhourController.getAllHappyHours);
router.put("/:id", happyhourController.updateHappyHour);

export default router;
