import { Router } from "express";
import {
  getAllBootcamps,
  createBootcamp,
  getOneBootcamp,
} from "../controllers/bootcamps";
const router = Router();

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router.route("/").get(getAllBootcamps);

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router.route("/:id").get(getOneBootcamp);

// @desc      Post  bootcamp
// @route     Post /api/v1/bootcamps
// @access    Public
router.route("/").post(createBootcamp);

export default router;
