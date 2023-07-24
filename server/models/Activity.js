import mongoose from "mongoose";


const activityScheme = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      
    },
    userRole: {
      type: String,
      required: true,
    },
    dataId: {
      type: String,
      required: true,
    },
    actionType:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Activity", activityScheme);
