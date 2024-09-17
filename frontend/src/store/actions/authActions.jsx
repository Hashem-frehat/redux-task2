import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "../actionTypes";

// Login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.error || "An error occurred",
    });
  }
};

// Register action
export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    await axios.post("http://localhost:5000/api/auth/register", {
      username,
      email,
      password,
    });
    dispatch({ type: REGISTER_SUCCESS });
    dispatch(login(email, password)); // Automatically log in after registration
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.error || "An error occurred",
    });
  }
};

// Logout action
export const logout = () => ({ type: LOGOUT });
