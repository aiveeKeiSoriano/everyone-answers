import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC4dygx3cuveemk1LRaaNImH1O7oq8ELms",
    authDomain: "everyone-answers-71a2f.firebaseapp.com",
    databaseURL: "https://everyone-answers-71a2f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "everyone-answers-71a2f",
    storageBucket: "everyone-answers-71a2f.appspot.com",
    messagingSenderId: "357382354349",
    appId: "1:357382354349:web:46909dac63f141e6141d24"
};
  
firebase.initializeApp(firebaseConfig)

export let databaseRef = firebase.firestore()
export let authProvider = new firebase.auth.GoogleAuthProvider()