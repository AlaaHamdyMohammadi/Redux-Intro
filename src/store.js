import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/AccountSlice";
import customerReducer from "./features/customers/CustomerSlice";

//To combine all reducers into Store -> use combineReducers method in Redux
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})
const store = createStore(rootReducer);

export default store;






