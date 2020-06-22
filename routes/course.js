import { Router } from "express";
import {
  getAllCourses,
  getOneCourse,
  createBootcampCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses";
const router = Router();

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router.route("/").get(getAllCourses);

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
router
  .route("/:bootcampId")
  .get(getOneCourse)
  .post(createBootcampCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

export default router;
