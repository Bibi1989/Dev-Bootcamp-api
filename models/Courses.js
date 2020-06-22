import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [50, "Name of bootcamp cannot be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is a require field"],
  },
  weeks: {
    type: String,
    required: [true, "Week is a require field"],
  },
  tuition: {
    type: Number,
    required: [true, "Tuition is a require field"],
  },
  minimumSkill: {
    type: [String],
    required: [true, "Minimum Skill is a require field"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholar: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "bootcamp",
    required: [true, "Bootcamp is a require"],
  },
});

export default mongoose.model("course", CourseSchema);
