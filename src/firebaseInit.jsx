// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAzxu3IpLQc4wM90WUDTpbKdz-xQPt6SiY",
    authDomain: "e-commerce-3d.firebaseapp.com",
    projectId: "e-commerce-3d",
    storageBucket: "e-commerce-3d.appspot.com",
    messagingSenderId: "266024669886",
    appId: "1:266024669886:web:ac2a2333daa8bf172804ef",
    measurementId: "G-K67R3R08WZ"
};

const app = firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
// Initialize Firebase

export const getFirebase = () => app;
export const getFirestore = () => firebase.firestore(app);
export const getAuth = () => provider;