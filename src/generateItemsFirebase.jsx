const firebase = require("firebase/app");
require('firebase/firestore');

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

// Inicializar Firebase
const getFirebase = () => app;
const getFirestore = () => firebase.firestore(app);

const db = getFirestore();
const items = db.collection('items')
function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
}

