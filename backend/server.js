import express from "express";
import "dotenv/config";
import router from "./src/routes/authRoutes.js";
import { connectDB } from "./src/lib/db.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
