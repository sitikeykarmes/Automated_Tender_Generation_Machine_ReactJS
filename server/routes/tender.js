const express = require("express");
const jwt = require("jsonwebtoken");
const Tender = require("../models/Tender");
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Save a tender to history
router.post("/save", verifyToken, async (req, res) => {
  try {
    const { title, categories, categoriesOrder } = req.body;
    
    const tender = new Tender({
      userId: req.user.id,
      title: title || `Tender ${new Date().toLocaleDateString()}`,
      categories,
      categoriesOrder
    });

    await tender.save();
    res.json({ msg: "Tender saved successfully", tender });
  } catch (err) {
    console.error("Save tender error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get tender history for user
router.get("/history", verifyToken, async (req, res) => {
  try {
    const tenders = await Tender.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json(tenders);
  } catch (err) {
    console.error("Get tender history error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get specific tender by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const tender = await Tender.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!tender) {
      return res.status(404).json({ msg: "Tender not found" });
    }
    
    res.json(tender);
  } catch (err) {
    console.error("Get tender error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete tender
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const tender = await Tender.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!tender) {
      return res.status(404).json({ msg: "Tender not found" });
    }
    
    res.json({ msg: "Tender deleted successfully" });
  } catch (err) {
    console.error("Delete tender error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;