import mongoose from 'mongoose';

const QuerySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    subject: { type: String, default: null },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' },
  },
  { timestamps: true }
);

const Query = mongoose.models.Query || mongoose.model('Query', QuerySchema);

export default Query;