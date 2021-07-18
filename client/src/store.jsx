import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// defaults to localStorage for web
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const intialstate = {};
const middleware = [thunk];
export const store = createStore(
  rootReducer,
  intialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
