import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
	const {fetchProducts,products}=useProductStore();
	useEffect(() => {
		fetchProducts();           /// When HomePage loads, it calls fetchProducts()
	}, [fetchProducts]);
	console.log("Products in HomePage:", products); // Log products to verify they are being fetched

	let content;
	if (products.length > 0) {
		content = (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
				{products.map((product) => (
					<ProductCard key={product._id || product.id} product={product} /> //For each product in the global state, it renders a ProductCard component.
				))}
			</div>
		);
	} else {
		content = (
			<div className="flex items-center gap-3">
				<span className="text-gray-700 dark:text-gray-200 text-2xl font-semibold">No products found</span>
				<Link
					to="/create"
					className="ml-2 text-2xl font-semibold text-blue-600 dark:text-blue-400 underline transition duration-200 hover:text-pink-600 dark:hover:text-pink-400 hover:scale-105"
				>
					Create Product
				</Link>
			</div>
		);
	}
	return (
		<div className="flex flex-col items-center pt-8 min-h-screen bg-gray-50 dark:bg-gray-900">
			<h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Current Products</h1>
			{content}
		</div>
	);
}
