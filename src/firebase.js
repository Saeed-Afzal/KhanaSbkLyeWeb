import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'


const app = firebase.initializeApp({
    apiKey: "AIzaSyB-GzTLrNUA0Viy0eKFdzVolSQHtS0C0-I",
    authDomain: "saeed-test-71d0c.firebaseapp.com",
    projectId: "saeed-test-71d0c",
    storageBucket: "saeed-test-71d0c.appspot.com",
    messagingSenderId: "89277570559",
    appId: "1:89277570559:web:ee2b1d5735414225025bca",
    measurementId: "G-Q7P7CZFEHK"
})

export const auth = app.auth()
export const db = app.firestore();

export default app
