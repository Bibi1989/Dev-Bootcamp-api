import BootCampSchema from "../models/Bootcamps";
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

    if (!bootcamps) {
      new CustomError(`Bootcamp with this ${req.params.id} not found`, 404);
    }

    res.send({ success: true, data: bootcamps });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};
