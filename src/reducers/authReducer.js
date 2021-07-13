import { LOGGED_OUT, USER_RETRIEVED } from "../actions/authActions";


export default function authReducer(state = {}, action) {
    switch (action.type) {
        case USER_RETRIEVED:
            return { ...state, logged: true, user: action.payload }
        case LOGGED_OUT:
            return { ...state, logged: false, user: null }
        default:
            return state
    }
}