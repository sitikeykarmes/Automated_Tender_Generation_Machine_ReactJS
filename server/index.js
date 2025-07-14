require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import routes
const authRoutes = require("./routes/auth");
const tenderRoutes = require("./routes/tender");

app.use("/api/auth", authRoutes);
app.use("/api/tenders", tenderRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
