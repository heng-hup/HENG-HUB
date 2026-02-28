// heng-core/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import walletRoutes from "./routes/walletRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 HENG Core API is running...");
});

app.use("/api/wallet", walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ HENG Core running on port ${PORT}`)
);