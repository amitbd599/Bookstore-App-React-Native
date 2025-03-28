import express from "express";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";
import { connectDB } from "./src/lib/db.js";

const app = express();

app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
