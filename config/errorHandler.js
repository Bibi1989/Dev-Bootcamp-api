// import express from "express";
import { CreateHttpError } from "http-errors";
import { CustomError } from "../utils/customError";

export const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new CustomError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new CustomError(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new CustomError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export const createError = (req, res, next) => {
  next(CreateHttpError(404));
};
