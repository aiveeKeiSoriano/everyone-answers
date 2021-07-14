import { databaseRef } from "../firebase-config"

export const STUDENT_SESSION_RETRIEVED = "STUDENT_SESSION_RETRIEVED"
export const STUDENT_SELECTED = "STUDENT_SELECTED"
export const PROCEED_ANSWER = "PROCEED_ANSWER"

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

export const getList = (session) => {
    return async (dispatch) => {
        await databaseRef.collection("sessions").doc(session).collection("students").get().then((querySnapshot) => {
            let students = []
            querySnapshot.forEach(el => students.push(el.id))
            dispatch(studentSessionRetrieved({list: students, session}))
        })
    }
}

