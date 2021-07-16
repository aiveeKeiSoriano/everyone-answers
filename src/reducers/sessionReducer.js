import { SESSION_ERROR, SESSION_RETRIEVED, STUDENTS_RETRIEVED, STATUS, RESET_SESSION } from "../actions/sessionActions"

const initialState = { students: [] }

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SESSION_RETRIEVED:
            return { ...state, sessionID: action.payload, status: null }
        case STUDENTS_RETRIEVED:
            return { ...state, students: action.payload, sessionError: null }
        case STATUS:
            return { ...state, status: action.payload }
        case SESSION_ERROR:
            return { ...state, sessionError: action.payload }
        case RESET_SESSION:
            return initialState
        default:
            return state
    }
}