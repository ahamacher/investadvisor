import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import investmentReducer from "./investmentReducer";

const rootReducer = combineReducers({
  user: userReducer,
  investment: investmentReducer
})

export default rootReducer
