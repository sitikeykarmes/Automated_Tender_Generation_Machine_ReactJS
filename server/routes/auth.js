const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const router = express.Router();

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with the same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Update existing user to link Google account
      user.googleId = profile.id;
      user.profilePicture = profile.photos[0].value;
      user.authMethod = 'google';
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    user = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
      profilePicture: profile.photos[0].value,
      authMethod: 'google'
    });
    
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Regular signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      authMethod: 'email' 
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Server error");
  }
});

// Regular login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check if user registered with Google OAuth
    if (user.authMethod === 'google') {
      return res.status(400).json({ msg: "Please use Google login for this account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      // Generate JWT token for the Google OAuth user
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      
      // Redirect to frontend with token and user data
      const userInfo = {
        name: req.user.name,
        email: req.user.email,
        profilePicture: req.user.profilePicture
      };
      
      // Redirect to frontend with token and user data as URL parameters
      res.redirect(`http://localhost:5173/auth/google/success?token=${token}&user=${encodeURIComponent(JSON.stringify(userInfo))}`);
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      res.redirect(`http://localhost:5173/auth/google/error?error=${encodeURIComponent(error.message)}`);
    }
  }
);

module.exports = router;
