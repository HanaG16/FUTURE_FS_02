const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  source: {
    type: String,
    default: 'Contact Form'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'lost'],
    default: 'new'
  },
  notes: {
    type: [String],
    default: []
  }
}, { timestamps: true })

module.exports = mongoose.model('Lead', leadSchema)