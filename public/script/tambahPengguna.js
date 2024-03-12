import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, getDocs, query, doc, where, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
const add = document.getElementById('add');
const back = document.getElementById('back');

async function  uploadData() {
    const noMeteran = document.getElementById('meteran').value;
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const kota = document.getElementById('kota').value;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const formattedDate = `${year}${month}${day}${hour}${minute}${second}`;

    const q = query(collection(db, 'users'), where('noMeteran', '==', noMeteran));
    const querySnapshot = await getDocs(q);

    const dataToUpload = {
        noMeteran : noMeteran,
        nama : nama,
        alamat : alamat,
        kota : kota,
    };

    //cek inputan apakah kosong atau tidak
    if (noMeteran === '' || nama === '' || alamat === '' || kota === '') {
        console.error("Data tidak lengkap!");
        alert("Data tidak lengkap!");
        throw new Error("No Meteran sudah ada!");
    }else{
        if (querySnapshot.size > 0) {
            console.error("No Meteran sudah ada!");
            alert("No Meteran sudah ada!");
            throw new Error("No Meteran sudah ada!");
        }else{
            try {
                const documentRef = doc(db, 'users', formattedDate);
                let dataUpdated = await setDoc(documentRef, dataToUpload);
                alert('Data berhasil ditambahkan ke database')
                return true;

            } catch (error) {
                console.error("Error saat menambahkan dokumen: ", error);
                alert("Terjadi kesalahan saat menambahkan data!");
                throw error;
            }
        }
    }
}

add.addEventListener('click',async function (event) {
    event.preventDefault();
    const success = await uploadData();
    try{
        if(success){
            console.log('Data berhasil ditambahkan ke database');
            setTimeout(() => {
                window.location.href = '/admin';
            }, 1000);
        }
    }catch(error){
        alert('Data gagal ditambahkan ke database');
        console.error(error);
    }
    //tunggu 5 detik

});

back.addEventListener('click',function (event) {
    event.preventDefault();
    window.location.href = '/admin';
});