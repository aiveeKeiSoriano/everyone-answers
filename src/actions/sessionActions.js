import { databaseRef } from "../firebase-config"

export const SESSION_RETRIEVED = "SESSION_RETRIEVED"
export const STUDENTS_RETRIEVED = "STUDENTS_RETRIEVED"

export const sessionRetrieved = (session) => ({
    type: SESSION_RETRIEVED,
    payload: session
})

export const studentsRetrieved = (students) => ({
    type: STUDENTS_RETRIEVED,
    payload: students
})

export const getSession = () => {
    return async (dispatch, getState) => {
        let id = getState().auth.user.email.replace(/[.]/g, "-")
        let result = await databaseRef.collection("teachers").doc(id).get()
        let data = result.data()
        if (!data.session) {
            dispatch(sessionRetrieved())
        }
        else dispatch(getStudents(data.session))
    }
}

export const getStudents = (session) => {
    return async (dispatch) => {
        databaseRef.collection("sessions").doc(session).collection("students").onSnapshot((querySnapshot) => {
            var students = [];
            querySnapshot.forEach((doc) => {
                students.push({ ...doc.data(), name: doc.id });
            });
            dispatch(sessionRetrieved(students))
        })
    }
}

export const newSession = (students) => {
    return async (dispatch, getState) => {
        let doc = await databaseRef.collection("sessions").add({})
        let id = doc.id
        await databaseRef.collection("teachers").doc(getState().auth.user.email.replace(/[.]/g, "-")).set({session: id}, { merge: true })
        for (let student of students) {
            await databaseRef.collection("sessions").doc(id).collection("students").doc(student).set({answer: ""}, { merge: true })
        }
        dispatch(getSession())
    }
}