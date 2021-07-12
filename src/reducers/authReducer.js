import { USER_RETRIEVED } from "../actions/authActions";


export default function authReducer(state = {}, action) {
    switch (action.type) {
        case USER_RETRIEVED:
            return { ...state, user: action.payload }
        default:
            return state
    }
}