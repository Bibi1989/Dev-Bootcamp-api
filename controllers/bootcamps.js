const BootCampSchema = require("../models/Bootcamps");
import { CustomError } from "../utils/customError";
import path from "path";
import { paginateApi } from "../middlewares/paginate";

export const createBootcamp = async (req, res, next) => {
  try {
    req.body.user = req.user.decoded.id;
    const publisher = await BootCampSchema.findOne({
      user: req.user.decoded.id,
    });

    if (publisher && req.user.decoded.role !== "admin") {
      return next(new CustomError(`You can only publish one bootcamp`, 400));
    }

    let bootcamp = new BootCampSchema(req.body);
    await bootcamp.save();
    res.send({ success: true, data: bootcamp });
  } catch (error) {
    const err = { success: false, error: error.message };
    next(new CustomError(error.message, 404));
  }
};

export const getAllBootcamps = async (req, res, next) => {
  const bootcamps = await paginateApi(BootCampSchema, req, next, "courses");

  console.log(req.user);

  res.send(bootcamps);
};

export const getOneBootcamp = async (req, res, next) => {
  try {
    let bootcamps = await BootCampSchema.findById(req.params.id);

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

export const uploadPhoto = async (req, res, next) => {
  try {
    const bootcamp = await BootCampSchema.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new CustomError(
          `Bootcamp with this id: ${req.params.id} is not found`,
          404
        )
      );
    }
    if (!req.files) {
      return next(new CustomError(`No photo uploaded`, 400));
    }

    let file = req.files.file;

    let max_size = 1000000;
    let upload_path = "./public/upload";

    console.log(file);

    if (!file.mimetype.startsWith("image")) {
      return next(new CustomError(`Upload an image`, 400));
    }

    if (file.size > max_size) {
      return next(
        new CustomError(
          `Image size should not be greater than ${max_size / 1000000}mb`,
          400
        )
      );
    }

    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${upload_path}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(
          new CustomError(
            `Image size should not be greater than ${max_size / 1000000}mb`,
            400
          )
        );
      }

      const uploaded_file = await BootCampSchema.findByIdAndUpdate(
        req.params.id,
        {
          photo: file.name,
        }
      );

      res.send({ success: true, data: uploaded_file });
    });
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
    const bootcamp = await BootCampSchema.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new CustomError(
          `Bootcamp with this id: ${req.params.id} is not found`,
          404
        )
      );
    }
    bootcamp.remove();
    res.json({ success: true, data: "Successfully deleted!!!" });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};
