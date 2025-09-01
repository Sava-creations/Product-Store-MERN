import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({             //structure of a product 
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},{
timestamps: true                                                                                              // add createdAt and updatedAt fields in each document
}); 
    
const Product = mongoose.model('Product', productSchema);                                                     //this becomes products automatically in MongoDB

export default Product;

//"name": "Laptop",            name<-- key            Laptop<-- value
//"price": 1000,
//"image": "https://example.com/laptop.jpg" 
