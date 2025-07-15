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
    const { title, sector, categories, categoriesOrder, isDraft } = req.body;
    
    const tender = new Tender({
      userId: req.user.id,
      title: title || `Tender ${new Date().toLocaleDateString()}`,
      sector: sector || 'general',
      categories,
      categoriesOrder,
      isDraft: isDraft || false
    });

    await tender.save();
    res.json({ msg: "Tender saved successfully", tender });
  } catch (err) {
    console.error("Save tender error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get analytics for user
router.get("/analytics", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Total tenders
    const totalTenders = await Tender.countDocuments({ userId });
    
    // Tenders this month
    const tendersThisMonth = await Tender.countDocuments({
      userId,
      createdAt: { $gte: startOfMonth }
    });
    
    // Tenders this week
    const tendersThisWeek = await Tender.countDocuments({
      userId,
      createdAt: { $gte: startOfWeek }
    });
    
    // Draft vs Finalized
    const draftTenders = await Tender.countDocuments({ userId, isDraft: true });
    const finalizedTenders = await Tender.countDocuments({ userId, isDraft: false });
    
    // Category-wise count
    const tenders = await Tender.find({ userId }).select('categories');
    const categoryCount = {};
    
    tenders.forEach(tender => {
      if (tender.categories) {
        for (const [categoryId, subcriteria] of tender.categories) {
          if (!categoryCount[categoryId]) {
            categoryCount[categoryId] = 0;
          }
          categoryCount[categoryId]++;
        }
      }
    });
    
    // Sector-wise count
    const sectorCount = await Tender.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: "$sector", count: { $sum: 1 } } }
    ]);
    
    // Most frequently used categories
    const mostUsedCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([categoryId, count]) => ({ categoryId, count }));
    
    // Most frequently used sectors
    const mostUsedSectors = sectorCount
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => ({ sector: item._id, count: item.count }));
    
    // Calculate average preparation time (mock for now - would need to track actual time)
    const averagePreparationTime = "2.5 hours"; // This would be calculated based on actual data
    
    res.json({
      totalTenders,
      tendersThisMonth,
      tendersThisWeek,
      draftTenders,
      finalizedTenders,
      categoryCount,
      mostUsedCategories,
      mostUsedSectors,
      averagePreparationTime
    });
  } catch (err) {
    console.error("Analytics error:", err);
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