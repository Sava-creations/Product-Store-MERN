// ...existing code...
// Removed invalid import of deleteProduct from backend controller
//global state
//can be used in any component
//zustand is a small, fast and scalable bearbones state-management solution using simplified flux principles
import { create } from "zustand";
import { deleteProduct } from "../../../Backend/controllers/product.controller";

export const useProductStore = create((set) => ({
    products: [],                                         //global state
    setProducts: (products) => set({ products }),

 //function {}returning empty object for now

//const [state, setState] = useState([]); local state

//const {products}= useProductStore(); //import this calling hook and get value from global state

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all the fields" };
        }
        const res = await fetch("/api/products", {                                                                      //http://localhost:5000/api/products
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] })); //append the new product to the existing products array in the global state 
        //...state.products means all the existing products in the array
        //data.data is the new product returned from the server data is in Backend\controllers\product.controller.js createProduct function

        return { success: true, message: "Product added successfully" };
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products"); //http://localhost:5000/api/products
        const data = await res.json();
        set({ products: data.data }); //set the products in the global state
    },

    deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {          //http://localhost:5000/api/products/:id
            method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({ products: state.products.filter((product) => product._id !== pid) })); //after deletion we dont need to refresh it immediately removes the deleted products
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message };
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {          //http://localhost:5000/api/products/:id
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({                //update UI without needing a refresh
                products: state.products.map((product) =>
                    product._id === pid ? data.data : product
                ),
            })); // Update the specific product in the global state
            return { success: true, message: "Product updated successfully" };
        } else {
            return { success: false, message: data.message };
        }
    }
}));