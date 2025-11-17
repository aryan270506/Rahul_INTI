// Models/Faculty.js
const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  image: { type: String },
  exchangeProgram: { type: String, required: true },
  duration: { type: String, required: true },
  publications: { type: Number, default: 0 },
  experience: { type: String, required: true },
  researchInterests: [String],
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  awards: [{
    title: String,
    year: String,
    description: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);
