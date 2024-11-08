import express from "express";
import * as barsController from "../controller/barsController.js";

const router = express.Router();

router.get("/", barsController.getAllBars);
router.get("/:id", barsController.getBarById); 
router.get("/zipcode/:zipcode", barsController.getBarsByZipcode);
router.post("/", barsController.addBar);
router.delete("/:id", barsController.deleteBarById);

export default router;
