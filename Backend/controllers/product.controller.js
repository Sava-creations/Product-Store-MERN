import Product from '../models/product.model.js'; // Import the Product model
import mongoose from 'mongoose';
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from the database
    res.status(200).json({ success: true, data: products });
  } 
  catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please fill all the fields" });
  }
  const newProduct = new Product(product) // create a new product instance

    try {
        await newProduct.save(); // save the product to the database
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params; 
  const updatedProduct = req.body; // get the updated product data from the request body

  try {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true }); //findByIdAndUpdate returns the default document before update
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } 
  catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {

  const {id}= req.params; // get the product id from the request parameters
  console.log("Product ID to delete:", id);

  try {
    await Product.findByIdAndDelete(id); // delete the product from the database
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } 
  catch (error) {
    console.log("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


  