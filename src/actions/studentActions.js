import { databaseRef } from "../firebase-config"

export const STUDENT_SESSION_RETRIEVED = "STUDENT_SESSION_RETRIEVED"
export const STUDENT_SELECTED = "STUDENT_SELECTED"
export const PROCEED_ANSWER = "PROCEED_ANSWER"
export const SYNC_STATUS = "SYNC_STATUS"
export const STUDENT_SESSION_ERROR = "STUDENT_SESSION_ERROR"
export const RESET_INPUT = "RESET_INPUT"
export const SYNC_PROMPT = "SYNC_PROMPT"

export const studentSessionRetrieved = (data) => ({
    type: STUDENT_SESSION_RETRIEVED,
    payload: data
})

export const studentSelected = (student) => ({
    type: STUDENT_SELECTED,
    payload: student
})

export const proceedAnswer = () => ({
    type: PROCEED_ANSWER
})

export const syncStatus = (status) => ({
    type: SYNC_STATUS,
    payload: status
})

export const studentSessionError = (err) => ({
    type: STUDENT_SESSION_ERROR,
    payload: err
})

export const resetInput = (bool) => ({
    type: RESET_INPUT,
    payload: bool
})

export const syncPrompt = (prompt) => ({
    type: SYNC_PROMPT,
    payload: prompt
})

export const listenToPrompt = () => {
    return async (dispatch, getState) => {
        databaseRef.collection("sessions").doc(getState().student.session).onSnapshot((doc) => {
                dispatch(syncPrompt(doc.data().prompt))
        }, (err) => alert(err))
    }
}

export const listenToReset = () => {
    return async (dispatch, getState) => {
        databaseRef.collection("sessions").doc(getState().student.session).collection("students").doc(getState().student.selected).onSnapshot((doc) => {
            if (doc.data().answer.length === 0) {
                dispatch(resetInput(true))
            }
        }, (err) => alert(err))
    }
}

export const getList = (session) => {
    return async (dispatch) => {
        try {
            await databaseRef.collection("sessions").doc(session).collection("students").get().then((querySnapshot) => {
                let students = []
                querySnapshot.forEach(el => students.push(el.id))
                if (students.length === 0) {
                    dispatch(studentSessionError("This session does not exist"))
                }
                else {
                    dispatch(studentSessionRetrieved({ list: students, session }))
                }
            })
        }
        catch (e) {
            dispatch(studentSessionError(e.message))
        }
    }
}

export const syncAnswer = (answer) => {
    return async (dispatch, getState) => {
        answer = answer.split("\n")
        dispatch(syncStatus("Syncing..."))
        dispatch(resetInput(false))
        try {
            await databaseRef.collection("sessions").doc(getState().student.session).collection("students").doc(getState().student.selected).update({ answer: answer }, { merge: true })
            dispatch(syncStatus("Sync Completed"))
        }
        catch (e) {
            dispatch(syncStatus("Sync Error: " + e.message))
        }
    }
}