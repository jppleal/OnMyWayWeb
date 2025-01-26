import { initializeApp } from "firebase/app";
import { getMessaging } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCW5FBUlwXzZXLTuPQncigPu4UfH7nA3ow",
    authDomain: "on-my-way-app-3ixreu.firebaseapp.com",
    databaseURL: "https://on-my-way-app-3ixreu-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "on-my-way-app-3ixreu",
    storageBucket: "on-my-way-app-3ixreu.appspot.com",
    messagingSenderId: "201893866882",
    appId: "1:201893866882:web:4da4dbfccc32f804b9339b",
    measurementId: "G-WMB3EK39Y34"
});

const app = initializeApp(firebaseApp)
const messaging = getMessaging(app)
