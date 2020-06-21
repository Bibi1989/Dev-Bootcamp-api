import mongoose from "mongoose";

const BootCampSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: [50, "Name of bootcamp cannot be more than 50 characters"],
  },
  description: {
    type: String,
    required: true,
    minlength: [20, "Description cannot be less than 20 characters"],
  },
  //   location: {
  //     type: {
  //       type: String,
  //       enum: ["Point"],
  //       required: true,
  //     },
  //     coordinates: {
  //       type: [Number],
  //       required: true,
  //       index: "2dsphere",
  //     },
  //     street: String,
  //     city: String,
  //     state: String,
  //     zipcode: String,
  //     country: String,
  //   },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid www, http or https",
    ],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please use a valid email address",
    ],
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Others",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must start from atleast 1"],
    max: [5, "Rating must not be more than 10"],
  },
  averageCost: {
    type: Number,
  },
  photo: {
    type: String,
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("bootcamp", BootCampSchema);
