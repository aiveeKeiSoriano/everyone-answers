
import firebase from 'firebase/app'
import 'firebase/auth'
import { authProvider } from '../firebase-config'

export const USER_RETRIEVED = "USER_RETRIEVED"

export const userRetrieved = (user) => ({
    type: USER_RETRIEVED,
    payload: user
})

export const SignIn = () => {
    return async (dispatch) => {
        let result = await firebase.auth().signInWithPopup(authProvider)
        console.log(result.user)
        dispatch(userRetrieved(result.user))
    }
}

export const checkSignIn = () => {
    return async (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(userRetrieved(user))
            }
        })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        firebase.auth().signOut().then(() => {
            dispatch(userRetrieved())
          }).catch((error) => {
            // An error happened.
          });
    }
}