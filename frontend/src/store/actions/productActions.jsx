// productActions.js
import axios from "axios";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
} from "../actionTypes";

export const fetchProducts = () => async (dispatch, getState) => {
  console.log(dispatch);
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    console.log(res);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/products",
      productData
    );
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/products/${id}`,
      productData
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
