const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

// POST Journal Entry
router.post('/', async (req, res) => {
  try {
    const { entry } = req.body;
    const newJournal = new Journal({ entry });
    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    res.status(400).json({ error: 'Error saving journal entry' });
  }
});

// GET All Journal Entries
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching journal entries' });
  }
});

module.exports = router;
