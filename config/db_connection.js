import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected successfully!!!`);
  } catch (error) {
    console.log(`Something went wrong on the database`);
  }
};
