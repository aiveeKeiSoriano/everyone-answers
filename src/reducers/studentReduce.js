import { PROCEED_ANSWER, STUDENT_SELECTED, STUDENT_SESSION_RETRIEVED } from "../actions/studentActions";


export default function studentReducer(state = { list: [], name: "" }, action) {
    switch (action.type) {
        case STUDENT_SESSION_RETRIEVED:
            return { ...state, ...action.payload, name: action.payload.list[0] }
        case STUDENT_SELECTED:
            return { ...state, name: action.payload }
        case PROCEED_ANSWER:
            return { ...state, selected: state.name }
        default:
            return state
    }
}