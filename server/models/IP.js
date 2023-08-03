import mongoose from "mongoose";

const ipScheme = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
      trim:true,
    },
}
);

export default mongoose.model("IP", ipScheme);
