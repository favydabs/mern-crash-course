import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ success: true, data: products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProducts = async (req, res) => {
  try {
    const product = req.body;
    console.log("Received product data:", product); // Add logging

    if (!product.name || !product.price || !product.image) {
      console.log("Validation failed:", { product }); // Add logging
      return res
        .status(400)
        .json({ success: false, message: "Invalid product data" });
    }

    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    console.log("Product saved successfully:", savedProduct); // Add logging

    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};