const mongoose = require('mongoose');

const globalPartnerSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  partnershipType: {
    type: String,
    trim: true
  },
  establishedDate: {
    type: String,
    trim: true
  },
  partnershipLevel: {
    type: String,
    enum: ['Platinum', 'Gold', 'Silver'],
    default: 'Silver'
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Expired', 'Inactive'],
    default: 'Active'
  },
  focusAreas: {
    type: String,
    trim: true
  },
  contactPerson: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
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
  benefits: {
    type: [String],
    default: []
  },
  studentsExchanged: {
    type: Number,
    default: 0
  },
  jointProjects: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster searches
globalPartnerSchema.index({ institutionName: 1, country: 1 });
globalPartnerSchema.index({ partnershipLevel: 1 });
globalPartnerSchema.index({ status: 1 });

module.exports = mongoose.model('GlobalPartner', globalPartnerSchema);