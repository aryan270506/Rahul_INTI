// routes/facultyRoutes.js
const express = require('express');
const router = express.Router();
const Faculty = require('../Modal/Faculty.js');

// @route   GET /api/faculty
// @desc    Get all faculty members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { department, search } = req.query;
    let query = {};
    
    if (department && department !== 'All') {
      query.department = department;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }
    
    const faculty = await Faculty.find(query);
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/faculty/:id
// @desc    Get single faculty member by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/faculty
// @desc    Create new faculty member
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const existingFaculty = await Faculty.findOne({ email: req.body.email });
    
    if (existingFaculty) {
      return res.status(400).json({ 
        success: false, 
        message: 'Faculty with this email already exists' 
      });
    }
    
    const faculty = await Faculty.create(req.body);
    res.status(201).json({ success: true, data: faculty });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/faculty/:id
// @desc    Update faculty member
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/faculty/:id
// @desc    Delete faculty member
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    
    res.status(200).json({ success: true, message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/faculty/department/:department
// @desc    Get faculty by department
// @access  Public
router.get('/department/:department', async (req, res) => {
  try {
    const faculty = await Faculty.find({ department: req.params.department });
    res.status(200).json({ success: true, count: faculty.length, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;