import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import { transactionsReducer } from "./reducers/transactionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
