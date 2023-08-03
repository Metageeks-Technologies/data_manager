import mongoose from 'mongoose';

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
});
const trimAllArrayValues = (arr) => {
  return arr.map((value) => value.trim());
};

// Pre-save hook to trim all array values
optionSchema.pre('save', function (next) {
  this.place = trimAllArrayValues(this.place);
  this.membership_type = trimAllArrayValues(this.membership_type);
  this.status = trimAllArrayValues(this.status);
  next();
});

export default  mongoose.model('Option', optionSchema);

