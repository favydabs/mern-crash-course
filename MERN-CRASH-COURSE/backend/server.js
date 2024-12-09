import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow us to accept json data

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
