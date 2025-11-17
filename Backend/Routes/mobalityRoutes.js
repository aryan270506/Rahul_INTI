const express = require('express');
const router = express.Router();
const Mobality = require('../Modal/Mobality.js');

// GET all mobality programs
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      programType, 
      destination,
      isActive 
    } = req.query;

    // Build query object
    let query = {};

    // Search filter
    if (search) {
      query.$or = [
        { programName: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { programType: { $regex: search, $options: 'i' } }
      ];
    }

    // Program type filter
    if (programType && programType !== 'All') {
      query.programType = programType;
    }

    // Destination filter
    if (destination && destination !== 'All') {
      query.destination = destination;
    }

    // Active status filter
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const mobalityPrograms = await Mobality.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: mobalityPrograms.length,
      data: mobalityPrograms
    });
  } catch (error) {
    console.error('Error fetching mobality programs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mobality programs',
      error: error.message
    });
  }
});

// GET single mobality program by ID
router.get('/:id', async (req, res) => {
  try {
    const mobality = await Mobality.findById(req.params.id);
    
    if (!mobality) {
      return res.status(404).json({
        success: false,
        message: 'Mobality program not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mobality
    });
  } catch (error) {
    console.error('Error fetching mobality program:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mobality program',
      error: error.message
    });
  }
});

// POST create new mobality program
router.post('/', async (req, res) => {
  try {
    const {
      programName,
      destination,
      programType,
      duration,
      startDate,
      applicationDeadline,
      availableSlots,
      eligibility,
      funding,
      contactEmail,
      contactPhone,
      image,
      benefits,
      participants
    } = req.body;

    // Validate required fields
    if (!programName || !destination || !contactEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: programName, destination, contactEmail'
      });
    }

    // Create new mobality program
    const newMobality = new Mobality({
      programName,
      destination,
      programType,
      duration,
      startDate,
      applicationDeadline,
      availableSlots: parseInt(availableSlots) || 0,
      eligibility,
      funding,
      contactEmail,
      contactPhone,
      image,
      benefits: Array.isArray(benefits) ? benefits : (benefits ? benefits.split(',').map(b => b.trim()) : []),
      participants: parseInt(participants) || 0
    });

    const savedMobality = await newMobality.save();

    res.status(201).json({
      success: true,
      message: 'Mobality program created successfully',
      data: savedMobality
    });
  } catch (error) {
    console.error('Error creating mobality program:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating mobality program',
      error: error.message
    });
  }
});

// PUT update mobality program
router.put('/:id', async (req, res) => {
  try {
    const {
      programName,
      destination,
      programType,
      duration,
      startDate,
      applicationDeadline,
      availableSlots,
      eligibility,
      funding,
      contactEmail,
      contactPhone,
      image,
      benefits,
      participants,
      isActive
    } = req.body;

    // Find mobality program
    const mobality = await Mobality.findById(req.params.id);

    if (!mobality) {
      return res.status(404).json({
        success: false,
        message: 'Mobality program not found'
      });
    }

    // Update fields
    if (programName !== undefined) mobality.programName = programName;
    if (destination !== undefined) mobality.destination = destination;
    if (programType !== undefined) mobality.programType = programType;
    if (duration !== undefined) mobality.duration = duration;
    if (startDate !== undefined) mobality.startDate = startDate;
    if (applicationDeadline !== undefined) mobality.applicationDeadline = applicationDeadline;
    if (availableSlots !== undefined) mobality.availableSlots = parseInt(availableSlots);
    if (eligibility !== undefined) mobality.eligibility = eligibility;
    if (funding !== undefined) mobality.funding = funding;
    if (contactEmail !== undefined) mobality.contactEmail = contactEmail;
    if (contactPhone !== undefined) mobality.contactPhone = contactPhone;
    if (image !== undefined) mobality.image = image;
    if (benefits !== undefined) {
      mobality.benefits = Array.isArray(benefits) ? benefits : benefits.split(',').map(b => b.trim());
    }
    if (participants !== undefined) mobality.participants = parseInt(participants);
    if (isActive !== undefined) mobality.isActive = isActive;

    const updatedMobality = await mobality.save();

    res.status(200).json({
      success: true,
      message: 'Mobality program updated successfully',
      data: updatedMobality
    });
  } catch (error) {
    console.error('Error updating mobality program:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating mobality program',
      error: error.message
    });
  }
});

// DELETE mobality program
router.delete('/:id', async (req, res) => {
  try {
    const mobality = await Mobality.findByIdAndDelete(req.params.id);

    if (!mobality) {
      return res.status(404).json({
        success: false,
        message: 'Mobality program not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mobality program deleted successfully',
      data: mobality
    });
  } catch (error) {
    console.error('Error deleting mobality program:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting mobality program',
      error: error.message
    });
  }
});

// GET statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalPrograms = await Mobality.countDocuments();
    const activePrograms = await Mobality.countDocuments({ isActive: true });
    const totalSlots = await Mobality.aggregate([
      { $group: { _id: null, total: { $sum: '$availableSlots' } } }
    ]);
    const totalParticipants = await Mobality.aggregate([
      { $group: { _id: null, total: { $sum: '$participants' } } }
    ]);

    const programsByType = await Mobality.aggregate([
      { $group: { _id: '$programType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalPrograms,
        activePrograms,
        totalAvailableSlots: totalSlots[0]?.total || 0,
        totalParticipants: totalParticipants[0]?.total || 0,
        programsByType
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;