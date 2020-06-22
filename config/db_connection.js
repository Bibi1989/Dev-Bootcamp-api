const mongoose = require("mongoose");

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected successfully!!!`.cyan);
  } catch (error) {
    console.log(`Something went wrong on the database`.red);
  }
};
