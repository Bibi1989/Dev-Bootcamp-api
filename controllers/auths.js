const User = require("../models/Users");
import { CustomError } from "../utils/customError";
import { sendTokenResponse } from "../utils/sendTokenResponse";

export const registerUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(
        new CustomError(`User with this ${req.body.email} exist`, 404)
      );
    }

    user = new User(req.body);

    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    const err = { success: false, error: error.message };
    next(new CustomError(error.message, 404));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new CustomError(`Your email or password field is empty!!!`, 404)
      );
    }
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new CustomError(
          `The user with this email: ${email} have not register yet`
        )
      );
    }
    const validPassword = await user.matchPassword(password);

    if (!validPassword) {
      return next(new CustomError(`Invalid password!!!`));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(new CustomError(error.message, 404));
  }
};

export const getUser = async (req, res, next) => {
  try {
    res.send({ success: true, data: req.user.userProfile });
  } catch (error) {
    next(new CustomError(error.message, 404));
  }
};
