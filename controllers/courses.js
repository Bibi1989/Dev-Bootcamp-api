const Course = require("../models/Courses");
const Bootcamp = require("../models/Bootcamps");
import { CustomError } from "../utils/customError";
import { paginateApi } from "../middlewares/paginate";

export const createBootcampCourse = async (req, res, next) => {
  try {
    let bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
      return next(
        new CustomError(
          `Bootcamp with this ${req.params.bootcampId} not found`,
          404
        )
      );
    }

    const course = new Course({
      ...req.body,
      bootcamp: req.params.bootcampId,
    });

    await course.save();
    res.send({ success: true, data: course });
  } catch (error) {
    const err = { success: false, error: error.message };
    next(new CustomError(error.message, 404));
  }
};

export const getAllCourses = async (req, res, next) => {
  const courses = await paginateApi(Course, req, next);

  res.send(courses);
};

export const getOneCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.bootcampId);

    if (!course) {
      return next(
        new CustomError(
          `Course with this ${req.params.bootcampId} not found`,
          404
        )
      );
    }

    res.send({ success: true, data: course });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.bootcampId,
      req.body,
      {
        new: true,
      }
    );

    if (!course) {
      return next(
        new CustomError(
          `Course with this ${req.params.bootcampId} not found`,
          404
        )
      );
    }

    res.send({ success: true, data: course });
  } catch (error) {
    const err = { success: false, statusCode: 404, error: error.message };
    next(new CustomError(error, 404));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.bootcampId);
    if (!course) {
      return next(
        new CustomError(
          `Course with this id: ${req.params.bootcampId} not found`,
          404
        )
      );
    }
    res.json({ success: true, data: "Successfully deleted!!!" });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};
