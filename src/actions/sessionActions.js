import { databaseRef } from "../firebase-config"

export const SESSION_RETRIEVED = "SESSION_RETRIEVED"
export const STUDENTS_RETRIEVED = "STUDENTS_RETRIEVED"
export const SUBMIT_STATUS = "SUBMIT_STATUS"
export const SESSION_ERROR = "SESSION_ERROR"

export const sessionRetrieved = (session) => ({
    type: SESSION_RETRIEVED,
    payload: session
})

export const studentsRetrieved = (students) => ({
    type: STUDENTS_RETRIEVED,
    payload: students
})

export const submitStatus = (status) => ({
    type: SUBMIT_STATUS,
    payload: status
})

export const sessionError = (error) => ({
    type: SESSION_ERROR,
    payload: error
})

export const getSession = () => {
    return async (dispatch, getState) => {
        try {
            let id = getState().auth.user.databaseID
            let result = await databaseRef.collection("teachers").doc(id).get()
            let data = result.data()
            if (!data.session) {
                dispatch(sessionRetrieved("none"))
            }
            else {
                dispatch(getStudents(data.session))
                dispatch(sessionRetrieved(data.session))
            }
        }
        catch (e) {
            dispatch(sessionError(e.message))
        }
    }
}

export const getStudents = (session) => {
    // session = "lmXRFhHWelsOoYc9lorm"
    return async (dispatch) => {
        try {
            databaseRef.collection("sessions").doc(session).collection("students").onSnapshot((querySnapshot) => {
                var students = [];
                querySnapshot.forEach((doc) => {
                    students.push({ ...doc.data(), name: doc.id });
                });
                students.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
                dispatch(studentsRetrieved(students))
            }, (e) => dispatch(sessionError(e.message)))
        }
        catch (e) {
            dispatch(sessionError(e.message))
        }
    }
}

export const newSession = (students) => {
    return async (dispatch, getState) => {
        try {
            let doc = await databaseRef.collection("sessions").add({ teacher: getState().auth.user.email })
            let id = doc.id
            await databaseRef.collection("teachers").doc(getState().auth.user.databaseID).set({ session: id }, { merge: true })
            for (let student of students) {
                let studentsRef = databaseRef.collection("sessions").doc(id).collection("students")
                await studentsRef.doc(student).set({ answer: "" }, { merge: true })
            }
            dispatch(getSession())
        }
        catch (e) {
            dispatch(submitStatus("Error: " + e.message))
        }
    }
}


// export const deleteSession = () => {
//     return async (dispatch, getState) => {
//         databaseRef.collection("sessions").doc(getState().session.sessionID).delete()
//     }
// }