const express = require('express');
const router = express.Router();
const Counseling = require('../models/Counseling');

// POST: Book a counseling session
router.post('/', async (req, res) => {
  try {
    const { name, email, date, reason } = req.body;
    const newBooking = new Counseling({ name, email, date, reason });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: 'Error booking counseling session' });
  }
});

// GET: Retrieve all bookings (optional)
router.get('/', async (req, res) => {
  try {
    const bookings = await Counseling.find().sort({ date: 1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching bookings' });
  }
});

module.exports = router;
