const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['plumbing', 'electrical', 'ac_repair', 'carpentry', 'painting', 'cleaning', 'appliance', 'pest_control']
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [150, 'Short description cannot exceed 150 characters']
  },
  icon: {
    type: String,
    default: 'build'
  },
  image: {
    type: String,
    default: ''
  },
  startingPrice: {
    type: Number,
    required: true,
    min: 0
  },
  visitCharge: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  features: [{
    type: String
  }],
  estimatedTime: {
    type: String,
    default: '1-2 hours'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);