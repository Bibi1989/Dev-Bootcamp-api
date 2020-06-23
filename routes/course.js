import { Router } from "express";
import {
  getAllCourses,
  getOneCourse,
  createBootcampCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses";
import { authenticate, authorize } from "../middlewares/authenticate";
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
  .post(authenticate, authorize("publisher", "admin"), createBootcampCourse)
  .patch(authenticate, authorize("publisher", "admin"), updateCourse)
  .delete(authenticate, authorize("publisher", "admin"), deleteCourse);

export default router;
