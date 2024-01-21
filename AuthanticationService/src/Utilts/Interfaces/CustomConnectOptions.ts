import mongoose from "mongoose";

interface CustomConnectOptions extends mongoose.ConnectOptions {
  useFindAndModify?: boolean;
  useCreateIndex?: boolean;
}

export default CustomConnectOptions;