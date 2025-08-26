import { create } from "zustand";// Zustand is a simple global state manager & create creates a global store= shared state across components.
import { deleteProduct } from "../../../Backend/controllers/product.controller";

export const useProductStore = create((set) => ({
    products: [],                                         //global array. So all components can access it.. This stores all products fetched from the backend
    setProducts: (products) => set({ products }),              //function to update the global products.

 //function {}returning empty object for now

//const [state, setState] = useState([]); local state

//const {products}= useProductStore(); //import this calling hook and get value from global state

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all the fields" };
        }
        const res = await fetch("/api/products", {                                //send request to backend API http://localhost:5000/api/products
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();          //Get JSON response back from the server data means whole JSON response
        set((state) => ({ products: [...state.products, data.data] })); //append the new product to the existing products array in the global state 
        //...state.products means all the existing products in the array
        //data.data is the new product returned from the server without success value
        //set(...) → updates the frontend UI without refreshing the page.
        return { success: true, message: "Product added successfully" };
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products"); //http://localhost:5000/api/products
        const data = await res.json();                 //If you don’t provide a method, fetch() defaults to GET.
        set({ products: data.data });                //Replaces the current products array in the global state with the array received from the backend.
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
    },

    deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {          //http://localhost:5000/api/products/:id
            method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
//       {
//         success: true,
//         message: "Product deleted successfully"
//       }

            set((state) => ({ products: state.products.filter((product) => product._id !== pid) })); //after deletion we dont need to refresh it immediately removes the deleted products from frontend
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message };
        }
    }

}));

