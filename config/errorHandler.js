// import express from "express";
import { CreateHttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  let error = {};
  let status;

  if (err.code === 11000) {
    status = 404;
    error.error = "There is a unique value";
    error.success = false;
  }

  // render the error page
  res.status(status);
  res.send(error);
};

export const createError = (req, res, next) => {
  next(CreateHttpError(404));
};
