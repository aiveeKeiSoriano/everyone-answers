import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";

const netReducer = combineReducers({auth: authReducer})

const store = createStore(netReducer, applyMiddleware(thunk))

export default store