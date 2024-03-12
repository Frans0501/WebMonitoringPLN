import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUGNFwKxU-_4HUPOLBqYnzGO4sdQilR14",
    authDomain: "kwhmonitoring-a3be7.firebaseapp.com",
    projectId: "kwhmonitoring-a3be7",
    storageBucket: "kwhmonitoring-a3be7.appspot.com",
    messagingSenderId: "640866951900",
    appId: "1:640866951900:web:6daecfa4cfac1d4ae90a19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let nama = document.getElementById('nama');
let password = document.getElementById('password');
let signAdmin = document.getElementById('sign_admin');

function createData() {
    let data = {
        name: nama.value,
        passwords: password.value,
    };

    // Tambahkan dokumen ke koleksi 'users' di Firestore
    addDoc(collection(db, 'user'), data)
        .then(() => {
            console.log("Data berhasil ditambahkan ke Firestore!");
        })
        .catch((error) => {
            console.error("Error saat menambahkan data ke Firestore: ", error);
        });
}

signAdmin.addEventListener('click', function () {
    console.log(nama.value);
    console.log(password.value);
    
    try {
        createData();
    } catch (error) {
        console.error("Error saat membuat data: ", error);
    }
});
//------------------------------------------------------------------------------------------

