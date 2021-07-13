import { SESSION_ERROR, SESSION_RETRIEVED, STUDENTS_RETRIEVED, SUBMIT_STATUS } from "../actions/sessionActions"

export default function sessionReducer(state = { students: [] }, action) {
    switch (action.type) {
        case SESSION_RETRIEVED:
            return { ...state, sessionID: action.payload }
        case STUDENTS_RETRIEVED:
            return { ...state, students: action.payload, sessionError: null }
        case SUBMIT_STATUS:
            return { ...state, submitStatus: action.payload }
        case SESSION_ERROR:
            return { ...state, sessionError: action.payload }
        default:
            return state
    }
}