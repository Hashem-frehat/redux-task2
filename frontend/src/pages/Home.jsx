import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Shopping Cart</h1>
      <p className="text-lg mb-6">
        Browse our products and start shopping today! We offer a wide range of
        items to suit all your needs.
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/products"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
        >
          Shop Now
        </Link>
        <div className="mt-6 md:mt-0">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Shopping"
            className="w-full max-w-md rounded shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
