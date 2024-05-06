import mongoose from "mongoose";

export const yearsOption = [];
const minYear = 2007;
const maxYear = new Date().getFullYear();

for (let year = minYear; year <= maxYear; year++) {
  yearsOption.push(year.toString());
}

const optionSchema = new mongoose.Schema({
  place: {
    type: [String],
    default: [],
  },
  membership_type: {
    type: [String],
    default: [],
  },
  status: {
    type: [String],
    default: [],
  },
  amc: {
    type: [String],
    default: [...yearsOption],
  },
  amcLetterStatus: {
    type: [String],
    default: [],
  },
  membershipStatus: {
    type: [String],
    default: [],
  },
});
const trimAllArrayValues = (arr) => {
  return arr.map((value) => value.trim());
};

// Pre-save hook to trim all array values
optionSchema.pre("save", function (next) {
  this.place = trimAllArrayValues(this.place);
  this.membership_type = trimAllArrayValues(this.membership_type);
  this.status = trimAllArrayValues(this.status);
  this.amc = trimAllArrayValues(this.amc);
  next();
});

export default mongoose.model("Option", optionSchema);
