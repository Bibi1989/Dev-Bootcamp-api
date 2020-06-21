import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db_connection";
import colors from "colors";

dotenv.config();

import usersRouter from "./routes/users";
import { errorHandler, createError } from "./config/errorHandler";

const app = express();

// connecting mongodb
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(createError);

// error handler
app.use(errorHandler);

module.exports = app;
