import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import cors from "cors";
import userRoutes from "./Routes/users.route.mjs";
import authRoutes from "./Routes/auth.route.mjs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is Connected!!!");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Port Running on ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("Failed to Connect", error);
  });
