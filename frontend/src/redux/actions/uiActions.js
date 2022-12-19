import axios from "axios";
import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from "../constants/uiConstants";

export const getCategoriesAsync = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_CATEGORIES_START });
      const { data } = await axios.get("/api/categories");
      dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_CATEGORIES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
