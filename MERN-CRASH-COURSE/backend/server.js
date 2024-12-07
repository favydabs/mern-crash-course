import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());// allow us to accept json data
app.post("/api/products", async (req, res) => {
  const product = res.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "Invalid product data" });
  }
  const newProduct = new product(product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
