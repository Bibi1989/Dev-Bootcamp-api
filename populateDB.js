const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const Bootcamp = require("./models/Bootcamps");
const { connectDB } = require("./config/db_connection");

connectDB();

const new_path = path.join(__dirname, `data/bootcamp.json`);

const bootcamps = JSON.parse(fs.readFileSync(new_path, "utf-8"));
// console.log(bootcamps);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
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
    console.log("Data Destroyed...".red);
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

console.log({ argv: process.argv[2], argv0: process.argv0 });

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
