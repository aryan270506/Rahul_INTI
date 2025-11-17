const express = require('express');
const router = express.Router();
const GlobalPartner = require('../Modal/globalPartners');

// GET all global partners
router.get('/', async (req, res) => {
  try {
    const partners = await GlobalPartner.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    console.error('Error fetching global partners:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching global partners',
      error: error.message
    });
  }
});

// GET single global partner by ID
router.get('/:id', async (req, res) => {
  try {
    const partner = await GlobalPartner.findById(req.params.id);
    
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Global partner not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    console.error('Error fetching global partner:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching global partner',
      error: error.message
    });
  }
});

// POST create new global partner
router.post('/', async (req, res) => {
  try {
    const partnerData = req.body;
    
    // Validate required fields
    if (!partnerData.institutionName || !partnerData.country || !partnerData.contactEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide institution name, country, and contact email'
      });
    }

    const newPartner = new GlobalPartner(partnerData);
    const savedPartner = await newPartner.save();
    
    res.status(201).json({
      success: true,
      message: 'Global partner created successfully',
      data: savedPartner
    });
  } catch (error) {
    console.error('Error creating global partner:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating global partner',
      error: error.message
    });
  }
});

// PUT update global partner
router.put('/:id', async (req, res) => {
  try {
    const partner = await GlobalPartner.findById(req.params.id);
    
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Global partner not found'
      });
    }

    const updatedPartner = await GlobalPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Global partner updated successfully',
      data: updatedPartner
    });
  } catch (error) {
    console.error('Error updating global partner:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating global partner',
      error: error.message
    });
  }
});

// DELETE global partner
router.delete('/:id', async (req, res) => {
  try {
    const partner = await GlobalPartner.findById(req.params.id);
    
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Global partner not found'
      });
    }

    await GlobalPartner.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Global partner deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting global partner:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting global partner',
      error: error.message
    });
  }
});

// GET filtered partners (by country, level, status)
router.get('/filter/:field/:value', async (req, res) => {
  try {
    const { field, value } = req.params;
    const query = {};
    
    if (field && value && value !== 'All') {
      query[field] = value;
    }
    
    const partners = await GlobalPartner.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    console.error('Error filtering global partners:', error);
    res.status(500).json({
      success: false,
      message: 'Error filtering global partners',
      error: error.message
    });
  }
});

// GET search partners
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const partners = await GlobalPartner.find({
      $or: [
        { institutionName: { $regex: searchQuery, $options: 'i' } },
        { country: { $regex: searchQuery, $options: 'i' } },
        { focusAreas: { $regex: searchQuery, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    console.error('Error searching global partners:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching global partners',
      error: error.message
    });
  }
});

// GET statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalPartners = await GlobalPartner.countDocuments();
    const activePartners = await GlobalPartner.countDocuments({ status: 'Active' });
    const totalStudents = await GlobalPartner.aggregate([
      { $group: { _id: null, total: { $sum: '$studentsExchanged' } } }
    ]);
    const totalProjects = await GlobalPartner.aggregate([
      { $group: { _id: null, total: { $sum: '$jointProjects' } } }
    ]);
    
    const partnersByLevel = await GlobalPartner.aggregate([
      { $group: { _id: '$partnershipLevel', count: { $count: {} } } }
    ]);
    
    const partnersByCountry = await GlobalPartner.aggregate([
      { $group: { _id: '$country', count: { $count: {} } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalPartners,
        activePartners,
        totalStudentsExchanged: totalStudents[0]?.total || 0,
        totalJointProjects: totalProjects[0]?.total || 0,
        partnersByLevel,
        topCountries: partnersByCountry
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