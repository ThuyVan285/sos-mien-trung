// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCysI6he-M84NBTHMM82Ly740s_-kCzSUU",
    authDomain: "sos-mien-trung.firebaseapp.com",
    projectId: "sos-mien-trung",
    storageBucket: "sos-mien-trung.firebasestorage.app",
    messagingSenderId: "794126200293",
    appId: "1:794126200293:web:73fbc9caa77fb972d8930c",
    measurementId: "G-4JEM71S38Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);