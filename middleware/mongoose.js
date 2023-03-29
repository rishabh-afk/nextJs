import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local"
  );
}

async function connectDB() {
  await mongoose
    .connect(MONGO_URL)
    .then((connection) => {
      console.log("--------- DB IS CONNECTED SUCCESSFULLY ---------");
    })
    .catch((error) => {
      console.log("--------- ERROR---------", error);
    });
}

export default connectDB;
