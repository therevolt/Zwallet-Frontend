import { combineReducers } from "redux";
import Trx from "./tranfer";
import User from "./users";
const RootReducer = combineReducers({
  user: User,
  transaction: Trx,
});
export default RootReducer;
