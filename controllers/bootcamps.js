import BootCampSchema from "../models/Bootcamps";

export const createBootcamp = async (req, res, next) => {
  try {
    let bootcamp = new BootCampSchema(req.body);
    await bootcamp.save();
    res.send({ success: true, data: bootcamp });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};

export const getAllBootcamps = async (req, res, next) => {
  try {
    let bootcamps = BootCampSchema.find();
    res.send({ success: true, data: bootcamps });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};
