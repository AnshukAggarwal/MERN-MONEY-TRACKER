import * as types from "../constants/transactionConstants";

const INITIAL_STATE = {
  loading: false,
  error: null,
  transactions: [],
};

export const transactionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_TRANSACTIONS_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    }
    case types.GET_TRANSACTIONS_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case types.ADD_TRANSACTION_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.ADD_TRANSACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    }
    case types.ADD_TRANSACTION_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
