import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  title: String,
  mobileSrc: String,
  laptopSrc: String,
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);