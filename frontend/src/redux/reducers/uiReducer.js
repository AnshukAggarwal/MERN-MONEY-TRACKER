import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from "../constants/uiConstants";

const INITIAL_STATE = {
  categories: [],
  loading: false,
  error: null,
};

export const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    }

    case GET_CATEGORIES_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
