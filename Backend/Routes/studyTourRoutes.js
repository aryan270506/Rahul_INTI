const express = require('express');
const router = express.Router();
const StudyTour = require('../Modal/StudyTour.js');

// GET all study tours
router.get('/', async (req, res) => {
  try {
    const tours = await StudyTour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching study tours', error: error.message });
  }
});

// GET single study tour by ID
router.get('/:id', async (req, res) => {
  try {
    const tour = await StudyTour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Study tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching study tour', error: error.message });
  }
});

// POST create new study tour
router.post('/', async (req, res) => {
  try {
    const tourData = {
      ...req.body,
      highlights: Array.isArray(req.body.highlights) 
        ? req.body.highlights 
        : req.body.highlights?.split(',').map(h => h.trim()).filter(h => h) || []
    };

    const newTour = new StudyTour(tourData);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ message: 'Error creating study tour', error: error.message });
  }
});

// PUT update study tour
router.put('/:id', async (req, res) => {
  try {
    const tourData = {
      ...req.body,
      highlights: Array.isArray(req.body.highlights) 
        ? req.body.highlights 
        : req.body.highlights?.split(',').map(h => h.trim()).filter(h => h) || []
    };

    const updatedTour = await StudyTour.findByIdAndUpdate(
      req.params.id,
      tourData,
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: 'Study tour not found' });
    }

    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: 'Error updating study tour', error: error.message });
  }
});

// DELETE study tour
router.delete('/:id', async (req, res) => {
  try {
    const deletedTour = await StudyTour.findByIdAndDelete(req.params.id);
    
    if (!deletedTour) {
      return res.status(404).json({ message: 'Study tour not found' });
    }

    res.json({ message: 'Study tour deleted successfully', tour: deletedTour });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting study tour', error: error.message });
  }
});

module.exports = router;