const mongoose = require("mongoose");

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

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const average = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    { $group: { _id: "$bootcamp", averageCost: { $avg: "$tuition" } } },
  ]);

  try {
    await this.model("bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(average[0].averageCost * 10) / 10,
    });
  } catch (error) {
    console.log(err.message);
  }
};

CourseSchema.post("save", async function () {
  this.constructor.getAverageCost(this.bootcamp);
});

CourseSchema.pre("remove", async function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("course", CourseSchema);
