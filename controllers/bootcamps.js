const BootCampSchema = require("../models/Bootcamps");
import { CustomError } from "../utils/customError";

export const createBootcamp = async (req, res, next) => {
  try {
    let bootcamp = new BootCampSchema(req.body);
    await bootcamp.save();
    res.send({ success: true, data: bootcamp });
  } catch (error) {
    const err = { success: false, error: error.message };
    next(new CustomError(error.message, 404));
  }
};

export const getAllBootcamps = async (req, res, next) => {
  try {
    let bootcamps = await BootCampSchema.find();

    res.send({ success: true, data: bootcamps });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};

export const getOneBootcamp = async (req, res, next) => {
  try {
    let bootcamps = await BootCampSchema.findById(req.params.id);

    console.log(!bootcamps);

    if (!bootcamps) {
      return next(
        new CustomError(`Bootcamp with this ${req.params.id} not found`, 404)
      );
    }

    res.send({ success: true, data: bootcamps });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};

export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCampSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!bootcamp) {
      new CustomError(`Bootcamp with this ${req.params.id} not found`, 404);
    }

    res.send({ success: true, data: bootcamp });
  } catch (error) {
    const err = { success: false, statusCode: 404, error: error.message };
    next(new CustomError(error, 404));
  }
};

export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCampSchema.findByIdAndDelete(req.params.id);
    console.log(bootcamp);
    if (!bootcamp) {
      return next(
        new CustomError(
          `Bootcamp with this id: ${req.params.id} is not found`,
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
