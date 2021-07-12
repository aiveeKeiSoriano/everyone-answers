import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import sessionReducer from "../reducers/sessionReducer";

const netReducer = combineReducers({auth: authReducer, session: sessionReducer})

const store = createStore(netReducer, applyMiddleware(thunk))

export default store