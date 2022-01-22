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

// item = {
//     category:1,
//     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero tempus, dapibus lacus nec, posuere orci. Praesent egestas, turpis sit amet rhoncus convallis, ante arcu maximus libero, sed aliquam justo erat quis ante. Proin suscipit pellentesque nisl. Vestibulum non commodo tortor. Vivamus scelerisque cursus ex, sit amet scelerisque nibh laoreet iaculis. Nunc mi lectus, commodo eget hendrerit ac, fringilla in tortor. Nullam non suscipit risus. Praesent pharetra efficitur pretium. In a nibh pretium, pretium leo in, luctus lorem. Maecenas fermentum in magna eget euismod. Nulla efficitur dapibus eros, id pulvinar massa porttitor ac. Duis iaculis porta odio, ut lobortis mi vehicula et.",
//     price: 10000,
//     stock: 10,
//     thumbnail: "images/template256x256.png",
//     title:""
// }

// titles = ['Remeras','Pantalones','Combo']
// counts = [0,0,0]
// for (let i = 0; i < 20; i++) {
//     category = getRandomInt(3);
//     counts[category - 1] += 1;
//     item.category = category;
//     item.title = `${titles[category-1]} ${counts[category - 1]}`;
//     items.add(item)
// }
