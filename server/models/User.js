const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Make password optional for Google OAuth users
  googleId: { type: String, required: false }, // For Google OAuth users
  profilePicture: { type: String, required: false }, // For Google OAuth profile picture
  authMethod: { type: String, enum: ['email', 'google'], default: 'email' }, // Track authentication method
});

module.exports = mongoose.model("User", UserSchema);
