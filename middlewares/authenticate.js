import jwt from "jsonwebtoken";
const User = require("../models/Users");
import { CustomError } from "../utils/customError";

export const authenticate = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // else if (req.cookie.token) {
    //   token = req.cookie.token;
    // }

    if (!token) {
      return next(new CustomError(`You are not authorize!!!`), 401);
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { userProfile: await User.findById(decoded.id), decoded };
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userProfile.role)) {
      return next(
        new CustomError(
          `User with this role: ${req.user.userProfile.role} is not permitted to create a bootcamp`,
          403
        )
      );
    }
    next();
  };
};
