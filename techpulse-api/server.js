const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articles");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TechPulse API running"
  });
});

app.use("/api", articleRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Server error"
  });
});

app.listen(PORT, () => {
  console.log(`TechPulse API running on port ${PORT}`);
});