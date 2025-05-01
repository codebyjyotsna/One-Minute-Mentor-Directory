const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    videoUrl: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
