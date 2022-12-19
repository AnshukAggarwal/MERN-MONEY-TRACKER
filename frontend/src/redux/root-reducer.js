import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import { transactionsReducer } from "./reducers/transactionReducer";
import { uiReducer } from "./reducers/uiReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  ui: uiReducer,
});

export default rootReducer;
