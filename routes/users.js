import { Router } from "express";
import { getAllBootcamps } from "../controllers/bootcamps";
const router = Router();

/* GET users listing. */
router.route("/").get(getAllBootcamps);

export default router;
