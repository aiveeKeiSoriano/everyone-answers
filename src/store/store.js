import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import sessionReducer from "../reducers/sessionReducer";
import studentReducer from "../reducers/studentReduce";

const netReducer = combineReducers({auth: authReducer, session: sessionReducer, student: studentReducer})

const store = createStore(netReducer, applyMiddleware(thunk))

export default store