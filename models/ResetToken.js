const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
});

module.exports = mongoose.model('ResetToken', resetTokenSchema);
