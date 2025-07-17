require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const app = express();

// Session configuration for Google OAuth
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import routes
const authRoutes = require("./routes/auth");
const tenderRoutes = require("./routes/tender");

app.use("/api/auth", authRoutes);
app.use("/api/tenders", tenderRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
