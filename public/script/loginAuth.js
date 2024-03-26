import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

//Config Firesbase
const firebaseConfig = {
    apiKey: "AIzaSyCUGNFwKxU-_4HUPOLBqYnzGO4sdQilR14",
    authDomain: "kwhmonitoring-a3be7.firebaseapp.com",
    databaseURL: "https://kwhmonitoring-a3be7-default-rtdb.asia-southeast1.firebasedatabase.app",
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
let meteran = document.getElementById('meteran');
let signAdmin = document.getElementById('sign_admin');
let signUser = document.getElementById('sign_user');

async function login() {
  let q;
    if(nama.value && password.value) {
      q = query(collection(db, 'admin'), where('username', '==', nama.value), where('password', '==', password.value));
    } else if(meteran.value) {
      q = query(collection(db, 'customers'), where('id_pelanggan', '==', meteran.value));

    }else {
      console.error("Data tidak lengkap!");
      alert("Pengguna Tidak Ditemukan!");
    }
    getDocs(q)
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                console.log("Login berhasil!");
                if (nama.value && password.value) {
                    window.location.href = "admin";
                } else if (meteran.value) {
                    window.location.href = "user/"+meteran.value;
                }
            } else {
                //console.log(querySnapshot);
                console.error("Pengguna tidak ditemukan!");
                alert("Pengguna tidak ditemukan!");
            }
        })
        .catch((error) => {
            console.error("Error saat melakukan query ke Firestore: ", error);
        });
}


signAdmin.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(nama.value);
    console.log(password.value);

    try {
        login();
    } catch (error) {
        console.error("Error saat login: ", error);
    }
});

signUser.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(meteran.value);
    try {
        login();
    } catch (error) {
        console.error("Error saat login: ", error);
    }
});
