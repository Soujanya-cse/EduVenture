const mongoose = require('mongoose');
const Schema = mongoose.Schema; // 👈 This line was missing or incomplete
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String },
  gender: { type: String },
  college: { type: String },
  about: { type: String },
  profileImage: { type: String },
  score: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  completedGames: { type: [String], default: [] },
  startedGames: { type: [String], default: [] } // 👈 NEW FIELD
});module.exports = mongoose.model('User', UserSchema); 