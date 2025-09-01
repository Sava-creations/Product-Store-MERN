import { useState } from "react";
import { toast } from "react-toastify";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => { //prop Receives one product object from HomePage

  const [updatedProduct, setUpdatedProduct] = useState(product);   //for editing
  const [showModal, setShowModal] = useState(false); // show/hide modal
  
  const { deleteProduct , updateProduct} = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid); //calls the deleteProduct function
    if (!success) {
      toast.error(`Error: ${message}`);
      return;
    } else {
      toast.success(`Success: ${message}`);
    }
  };
  // Open modal for editing
  const handleEditClick = () => {
    setUpdatedProduct(product);  //Closed modal without saving Now clicks Edit again → if we don’t reset, the modal will still show the old unsaved edits!
    setShowModal(true);
  };

  // Handle update submit
  const handleUpdateProduct = async (e) => {
    e.preventDefault();  //stop reloading
    const { success, message } = await updateProduct(product._id, updatedProduct); //Calls the function updateProduct 
    setShowModal(false);
    if (!success) {
      toast.error(`Error: ${message}`);
      return;
    } else {
      toast.success(`Success: ${message}`);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setUpdatedProduct(product);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-10 w-full max-w-xs">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md mb-3"
        />
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3">Rs.{product.price}</p>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 rounded bg-yellow-500 text-white font-medium text-xs hover:bg-yellow-600 transition" onClick={handleEditClick}>Edit</button>
          <button className="px-3 py-1.5 rounded bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
        </div>
      </div>

      {/* Modal for editing product */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Edit Product</h2>
            <form className="flex flex-col gap-4" onSubmit={handleUpdateProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={updatedProduct.name}               //show previous value in input box
                onChange={e => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}  //...updatedProduct → keeps all the existing properties  name: e.target.value → replaces only the name property
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Product Price"
                value={updatedProduct.price}
                onChange={e => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Product Image URL"
                value={updatedProduct.image}
                onChange={e => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <div className="flex gap-4 justify-end mt-2">
                <button type="button" className="px-4 py-2 rounded bg-gray-400 text-white font-medium text-sm hover:bg-gray-500 transition" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
