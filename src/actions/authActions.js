
import firebase from 'firebase/app'
import 'firebase/auth'
import { authProvider, databaseRef } from '../firebase-config'

export const USER_RETRIEVED = "USER_RETRIEVED"
export const LOGGED_OUT = "LOGGED_OUT"

export const userRetrieved = (user) => ({
    type: USER_RETRIEVED,
    payload: user
})

export const loggedOut = () => ({
    type: LOGGED_OUT
})

export const SignIn = () => {
    return async (dispatch) => {
        let result = await firebase.auth().signInWithPopup(authProvider)
        let user = result.user
        let id = user.email.replace(/[.]/g, "-")
        await databaseRef.collection("teachers").doc(id).set({
            email: user.email
        }, { merge: true })
        dispatch(userRetrieved({ ...user, databaseID: id }))
    }
}

export const checkSignIn = () => {
    return async (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            let id = user.email.replace(/[.]/g, "-")
                dispatch(userRetrieved({ ...user, databaseID: id }))
            }
            else {
                dispatch(loggedOut())
            }
        })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        firebase.auth().signOut().then(() => {
            dispatch(loggedOut())
          }).catch((error) => {
            // An error happened.
          });
    }
}
