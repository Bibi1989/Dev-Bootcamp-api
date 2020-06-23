import { Router } from "express";
import {
  getAllBootcamps,
  createBootcamp,
  getOneBootcamp,
  deleteBootcamp,
  updateBootcamp,
  uploadPhoto,
} from "../controllers/bootcamps";
import { authenticate, authorize } from "../middlewares/authenticate";
const router = Router();

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router
  .route("/")
  .get(getAllBootcamps)
  .post(authenticate, authorize("publisher", "admin"), createBootcamp);

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router
  .route("/:id")
  .get(getOneBootcamp)
  .patch(authenticate, authorize("publisher", "admin"), updateBootcamp)
  .delete(authenticate, authorize("publisher", "admin"), deleteBootcamp);

// @desc      Post  bootcamp
// @route     Post /api/v1/bootcamps
// @access    Public
router
  .route("/:id/photo")
  .patch(authenticate, authorize("publisher", "admin"), uploadPhoto);

export default router;
