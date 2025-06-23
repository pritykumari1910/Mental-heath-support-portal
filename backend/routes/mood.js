const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// POST Mood
router.post('/', async (req, res) => {
  try {
    const { mood } = req.body;
    const newMood = new Mood({ mood });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(400).json({ error: 'Error saving mood' });
  }
});

// GET All Moods (Optional for review)
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching moods' });
  }
});

module.exports = router;
