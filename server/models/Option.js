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

export default  mongoose.model('Option', optionSchema);

