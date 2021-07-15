import { PROCEED_ANSWER, RESET_INPUT, STUDENT_SELECTED, STUDENT_SESSION_ERROR, STUDENT_SESSION_RETRIEVED, SYNC_PROMPT, SYNC_STATUS } from "../actions/studentActions";


export default function studentReducer(state = { list: [], name: "" }, action) {
    switch (action.type) {
        case STUDENT_SESSION_RETRIEVED:
            return { ...state, ...action.payload, name: action.payload.list[0] }
        case STUDENT_SELECTED:
            return { ...state, name: action.payload }
        case PROCEED_ANSWER:
            return { ...state, selected: state.name }
        case SYNC_STATUS:
            return { ...state, status: action.payload }
        case STUDENT_SESSION_ERROR:
            return { ...state, error: action.payload }
        case RESET_INPUT:
            return { ...state, reset: action.payload }
        case SYNC_PROMPT:
            return { ...state, prompt: action.payload }
        default:
            return state
    }
}