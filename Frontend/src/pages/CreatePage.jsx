import { useState } from "react";
import { useProductStore } from "../store/product";
import { Link } from "react-router-dom";
const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const { createProduct } = useProductStore(); 

	const handleAddProduct = async (e) => {
		e.preventDefault();
		console.log("Adding product:", newProduct);
		const { success, message 	} = await createProduct(newProduct); //product.js has success,message return
		console.log("Success:",success)
		console.log("Message:",message)

		if (!success) {
			// Handle error (e.g., show a notification to the user)
			alert(`Error: ${message}`);
			return;
		}
		else{
			alert(`Success: ${message}`);
			window.location.href = "/"; // Redirect to home page// Optionally, redirect to another page or show a success message
		}
		// Clear the form
		setNewProduct({ name: "", price: "", image: "" });
	};

	return (
		<div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 pt-8">
			<h1 className="text-xl font-bold text-center mb-4 text-black dark:text-white">Create New Product</h1>
			<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
				<form
					className="flex flex-col gap-6"
					onSubmit={handleAddProduct}
				>
					<input
						type="text"
						placeholder="Product Name"
						name="name"
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
					/>
					<input
						type="text"
						placeholder="Product Price"
						name="price"
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
					/>
					<input
						type="text"
						placeholder="Product Image URL"
						name="image"
						value={newProduct.image}
						onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
					/>
					<button
						type="submit"
						className="w-full py-2 px-4 rounded bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
						onClick={handleAddProduct}
					>
						Add Product
					</button>
				</form>
			</div>
			{/* Link to homepage below the form box */}
			<Link
				to="/"
				className="mt-6 text-lg font-semibold text-blue-600 dark:text-blue-400 underline transition duration-200 hover:text-pink-600 dark:hover:text-pink-400 hover:scale-105"
			>
				&larr; Back to Home
			</Link>
		</div>
	);
};
export default CreatePage;