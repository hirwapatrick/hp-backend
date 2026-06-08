import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, default: '', trim: true },
  period: { type: String, default: '', trim: true },
  description: { type: String, default: '' },
  highlights: [{ type: String, trim: true }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
