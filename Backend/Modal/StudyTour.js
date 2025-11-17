const mongoose = require('mongoose');

const studyTourSchema = new mongoose.Schema({
  tourName: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  university: {
    type: String,
    required: true,
    trim: true
  },
  program: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  startDate: {
    type: String,
    trim: true
  },
  cost: {
    type: String,
    trim: true
  },
  spotsAvailable: {
    type: Number,
    default: 0
  },
  focusAreas: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  contactPhone: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'
  },
  highlights: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('StudyTour', studyTourSchema);