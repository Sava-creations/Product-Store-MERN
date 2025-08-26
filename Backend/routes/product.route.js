import express from 'express';
import Product from '../models/product.model.js';                              // Import the Product model
import mongoose, { get } from 'mongoose';
import { createProduct,getProducts, deleteProduct, updateProduct } from '../controllers/product.controller.js'; // Import the controller function

const router = express.Router();

router.post('/',createProduct);  //If the frontend sends a POST /api/products request → createProduct controller runs.

router.delete('/:id', deleteProduct);

router.get('/', getProducts);

router.put('/:id', updateProduct);


export default router;

