//entry point
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT =process.env.PORT || 5000; // from env env file we re using PORT if we forgot to set it, it will default to 5000

app.use(express.json()); // Middleware allows us to parse JSON request bodies

app.use('/api/products', productRoutes); // Use 1 route 
//this part will added to all HTTP requests to the product routes / means /api/products /:id means /api/products/:id
//console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
});
