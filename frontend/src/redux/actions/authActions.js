import {
  ADD_USER_START,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from "../constants/authConstants";
import axios from "axios";

export const registerUserAsync = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_START });
      const { data } = await axios.post("/api/users/register", userData);
      dispatch({ type: ADD_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_USER_FAIL, payload: error.response.data.message });
    }
  };
};

export const loginUserAsync = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_START });
      const { data } = await axios.post("/api/users/login", userData);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch({ type: "LOGOUT_USER" });
  };
};

export const resetAuthState = () => {
  return {
    type: "RESET_AUTH_STATE",
  };
};
