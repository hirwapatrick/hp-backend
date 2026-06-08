import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, default: '' },
}, { _id: false });

const skillSchema = new mongoose.Schema({
  categoryKey: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  icon: { type: String, default: '' },
  color: { type: String, default: '#61DAFB' },
  skills: [skillItemSchema],
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
