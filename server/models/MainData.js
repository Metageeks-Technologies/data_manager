import mongoose from "mongoose";

const mainDataSchema = new mongoose.Schema({
  dri_id: { type: String, default: "" },
  place: { type: String, default: "" },
  appNumber: { type: String, default: "" },
  company: { type: String, default: "" },
  membership_type: { type: String, default: "" },
  date: { type: String, default: "" },
  amc: { type: String, default: "" },
  customerName: { type: String, default: "" },
  GSV: { type: Number, default: 0 },
  CSV: { type: Number, default: 0 },
  deposit: { type: Number, default: "" },
  status: { type: String, default: "" },
  currentValue: { type: String },
  remarks: { type: String, default: "",trim: true },
  lastCommunication :{ type: String, default: "" },
  address: { type: String, default: "" ,trim: true},
  profession: { type: String, default: "" },
  residentialPhone: { type: String, default: "" },
  officePhone: { type: String, default: "" },
  acceptance: { type: String, enum: ['accepted', 'deleted'], default:"accepted",required:true},
  editStatus: { type: String, enum: ['approved', 'rejected','pending','unchanged'], default:"unchanged",required:true}
});

export default mongoose.model("MainData", mainDataSchema);
