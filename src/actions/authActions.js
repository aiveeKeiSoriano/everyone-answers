
import 'firebase/auth'
import { authRef } from '../firebase-config'
import { resetSession } from './sessionActions'

export const USER_RETRIEVED = "USER_RETRIEVED"
export const LOGGED_OUT = "LOGGED_OUT"

export const userRetrieved = (user) => ({
    type: USER_RETRIEVED,
    payload: user
})

export const loggedOut = () => ({
    type: LOGGED_OUT
})

export const checkSignIn = () => {
    return async (dispatch) => {
        try {
            authRef.onAuthStateChanged((user) => {
                if (user) {
                    let id = user.email.replace(/[.]/g, "-")
                    dispatch(userRetrieved({ ...user, databaseID: id }))
                }
                else {
                    dispatch(loggedOut())
                }
            })
        }
        catch (e) {
            alert(e.message)
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        authRef.signOut().then(() => {
            dispatch(loggedOut())
            dispatch(resetSession())
        }).catch((error) => {
            alert(error)
        });
    }
}
