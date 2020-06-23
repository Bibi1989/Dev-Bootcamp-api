const mongoose = require("mongoose");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  fullname: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please use a valid email address",
    ],
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be equal to 6 or more"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// save fullname of user
UserSchema.pre("save", async function (next) {
  this.fullname = `${this.firstname} ${this.lastname}`;
  next();
});

// hash password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// generate token
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      fullname: this.fullname,
      email: this.email,
      role: this.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_DATE }
  );
};

// compare password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", UserSchema);
