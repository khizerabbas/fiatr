import { combineReducers } from "redux";
import auth from "./auth";
import register from "../reducer/auth";
import alert from "./alert";
import Map from "./MapData";

const rootReducer = combineReducers({
  register,
  auth,
  alert,
  Map,
});
export default rootReducer;
