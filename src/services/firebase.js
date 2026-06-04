// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCysI6he-M84NBTHMM82Ly740s_-kCzSUU",
    authDomain: "sos-mien-trung.firebaseapp.com",
    projectId: "sos-mien-trung",
    storageBucket: "sos-mien-trung.firebasestorage.app",
    messagingSenderId: "794126200293",
    appId: "1:794126200293:web:73fbc9caa77fb972d8930c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;