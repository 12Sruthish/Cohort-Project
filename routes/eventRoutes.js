const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// Add event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json({ message: "Event added", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;