// This file sets up the connection to the database
// It is used to connect the backend server to MongoDB
// The connection is required for storing and retrieving product data
import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);                                                                                             // process code 1-exit with failiure 0-success
    }
};