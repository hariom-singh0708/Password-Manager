const mongoose = require('mongoose');

const PasswordEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  url: { type: String },
  username: { type: String },
  passwordEncrypted: { type: String }, // AES encrypted ciphertext
}, { timestamps: true });

module.exports = mongoose.model('PasswordEntry', PasswordEntrySchema);
