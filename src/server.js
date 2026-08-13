require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { testConnection } = require("./config/db");
const apiKeyAuth = require("./middleware/apiKeyAuth");
const departemenITRoutes = require("./routes/departemenIT");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/departemen-it", apiKeyAuth, departemenITRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route tidak ditemukan" });
});

async function start() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`[Server] API jalan di port ${PORT}`);
  });
}

start();
