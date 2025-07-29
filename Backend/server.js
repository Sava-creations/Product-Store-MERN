//entry point
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(express.json()); // Middleware allows us to parse JSON request bodies

app.post('/api/products',async (req, res) => {
  const product = req.body; // user will send this data

  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Please fill all the fields' });
  }
  const newProduct = new Product(product) // create a new product instance

    try {
        await newProduct.save(); // save the product to the database
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


//console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on port 5000');
});
//