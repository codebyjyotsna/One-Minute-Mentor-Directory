const express = require('express');
const router = express.Router();
const Video = require('../models/Video'); // MongoDB model for videos

// Get videos with optional filters
router.get('/', async (req, res) => {
  const { category, search } = req.query;

  try {
    const query = {};
    if (category) query.category = category;
    if (search) query.$or = [{ title: new RegExp(search, 'i') }, { tags: new RegExp(search, 'i') }];

    const videos = await Video.find(query).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Post a new video
router.post('/', async (req, res) => {
  const { title, description, tags, videoUrl, category } = req.body;

  try {
    const newVideo = new Video({ title, description, tags, videoUrl, category });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

module.exports = router;
