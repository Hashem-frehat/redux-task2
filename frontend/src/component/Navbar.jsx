import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          ShoppingCart
        </Link>
        <div className="flex items-center">
          <Link to="/products" className="text-white mr-4">
            Products
          </Link>
          {isAuthenticated ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="text-white mr-4">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/cart" className="text-white mr-4">
                Cart ({items.length})
              </Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
