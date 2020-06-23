import { Router } from "express";
import {
  getAllBootcamps,
  createBootcamp,
  getOneBootcamp,
  deleteBootcamp,
  updateBootcamp,
  uploadPhoto,
} from "../controllers/bootcamps";
const router = Router();

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router.route("/").get(getAllBootcamps).post(createBootcamp);

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router
  .route("/:id")
  .get(getOneBootcamp)
  .patch(updateBootcamp)
  .delete(deleteBootcamp);

// @desc      Post  bootcamp
// @route     Post /api/v1/bootcamps
// @access    Public
router.route("/:id/photo").patch(uploadPhoto);

export default router;
