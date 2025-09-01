// This file contains functions that handle requests related to products.
// Each function talks to the database and sends a response to the frontend.
// These are called 'controllers' in backend development.

//logic for CRUD (Create, Read, Update, Delete).

import Product from '../models/product.model.js';                             // Import the Product model
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();                                    // fetch all products from the database
    res.status(200).json({ success: true, data: products });
  } 
  catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {                                                          
  const product = req.body;                            // user will send this data frontend - request body

  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please fill all the fields" });
  }
  const newProduct = new Product(product)                                     // create a new product instance/ MongoDB document with key value pairs

    try {
        await newProduct.save();                                              // save the product to the database
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;                               // extract product id
  const updatedData = req.body;                                                // extract updated product data from the request body that user will send from frontend

  if (!mongoose.Types.ObjectId.isValid(id)) {                                   //checking if the id is valid to prevent unncessary database queries for invalid IDs
  return res.status(400).json({ success: false, message: 'Invalid product ID' }); //24 character hex string
}

  try {                                               //Mongoose searches for the product with that id and updates it if found.
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });            //findByIdAndUpdate returns the default document before update and with {new:true} it returns the updated document
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });                   //In case the ID is valid but not in DB
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } 
  catch (error) {            //db not reachable
    console.log("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {

  const {id}= req.params;                                                                                  // get the product id from the request parameters
  console.log("Product ID to delete:", id);
  
  if (!mongoose.Types.ObjectId.isValid(id)) {                                                              //checking if the id is valid
    return res.status(400).json({ success: false, message: 'Invalid product ID' }); 
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);                                            // delete the product from the database
    
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } 
  catch (error) {
    console.log("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
