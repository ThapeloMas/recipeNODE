
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Recipes API");
});
// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", 
    credentials: true }));
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const recipeRoutes = require("./routes/recipeRoutes");
app.use("/api/recipes", recipeRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = router;