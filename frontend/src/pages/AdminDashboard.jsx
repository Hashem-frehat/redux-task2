import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/actions/productActions"; // Adjust import paths as needed

const AdminDashboard = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); // Adjust if needed based on your state shape

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: e.target.elements.name.value,
      description: e.target.elements.description.value,
      price: parseFloat(e.target.elements.price.value),
      stock: parseInt(e.target.elements.stock.value, 10),
    };
    await dispatch(addProduct(newProduct));
    // Optionally clear the form fields here
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updatedProduct = {
      ...editingProduct,
      name: e.target.elements.name.value,
      description: e.target.elements.description.value,
      price: parseFloat(e.target.elements.price.value),
      stock: parseInt(e.target.elements.stock.value, 10),
    };
    await dispatch(updateProduct(editingProduct.id, updatedProduct));
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-6">
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          className="w-full p-2 border rounded mb-2"
          required
        ></textarea>
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Product List</h3>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              {editingProduct && editingProduct.id === product.id ? (
                <form onSubmit={handleUpdateProduct} className="space-y-2">
                  <input
                    name="name"
                    type="text"
                    defaultValue={editingProduct.name}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    name="description"
                    type="text"
                    defaultValue={editingProduct.description}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    name="price"
                    type="number"
                    defaultValue={editingProduct.price}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    name="stock"
                    type="number"
                    defaultValue={editingProduct.stock}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p>{product.description}</p>
                  <p>Price: ${Number(product.price).toFixed(2)}</p>
                  <p>Stock: {product.stock}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
