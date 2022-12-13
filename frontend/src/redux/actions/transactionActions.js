import * as types from "../constants/transactionConstants";
import { store } from "../store";
import axios from "axios";

export const getTransactionAsync = () => {
  return async (dispatch) => {
    const token = await store.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: types.GET_TRANSACTIONS_START });
      const { data } = await axios.get("/api/transactions/", config);
      dispatch({ type: types.GET_TRANSACTIONS_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({
        type: types.GET_TRANSACTIONS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
