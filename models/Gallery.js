import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  width: { type: Number, default: 600 },
  height: { type: Number, default: 400 },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
