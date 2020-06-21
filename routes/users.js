import { Router } from "express";
import { getAllBootcamps, createBootcamp } from "../controllers/bootcamps";
const router = Router();

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router.route("/").get(getAllBootcamps);

router.route("/").post(createBootcamp);

export default router;
