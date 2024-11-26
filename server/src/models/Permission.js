const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Permission', permissionSchema);