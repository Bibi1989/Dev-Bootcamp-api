const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const Bootcamp = require("./models/Bootcamps");
const Course = require("./models/Courses");
const { connectDB } = require("./config/db_connection");

connectDB();

// path
const bootcamp_path = path.join(__dirname, `data/bootcamp.json`);
const course_path = path.join(__dirname, `data/course.json`);

// json files
const bootcamps = JSON.parse(fs.readFileSync(bootcamp_path, "utf-8"));
const courses = JSON.parse(fs.readFileSync(course_path, "utf-8"));

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    // await Course.create(courses);
    console.log("Data Imported...".green);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data Destroyed...".red);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
