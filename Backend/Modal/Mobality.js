const mongoose = require('mongoose');

const mobalitySchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  programType: {
    type: String,
    required: true,
    enum: [
      'Student Exchange',
      'Faculty Exchange',
      'Research Internship',
      'Industry Internship',
      'Short-term Program',
      'Language Program',
      'Research Fellowship'
    ],
    default: 'Student Exchange'
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  eligibility: {
    type: String,
    required: true,
    trim: true
  },
  funding: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'
  },
  benefits: {
    type: [String],
    default: []
  },
  participants: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
mobalitySchema.index({ programName: 'text', destination: 'text', programType: 'text' });

// Virtual for checking if application deadline has passed
mobalitySchema.virtual('isDeadlinePassed').get(function() {
  return new Date() > this.applicationDeadline;
});

// Method to check if slots are available
mobalitySchema.methods.hasSlotsAvailable = function() {
  return this.availableSlots > 0;
};

const Mobality = mongoose.model('Mobality', mobalitySchema);

module.exports = Mobality;