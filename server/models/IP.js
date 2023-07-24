import mongoose from "mongoose";

const ipScheme = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      // unique: true,
    },
}
);

export default mongoose.model("IP", ipScheme);
