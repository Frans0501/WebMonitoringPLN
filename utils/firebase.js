import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    doc, 
    setDoc, 
    getDocs, 
    query,
    where,
    deleteDoc, 
    } from 'firebase/firestore';

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

let app;
let firestoreDb;

// Initialize Firebase
export  function initializeFirebaseApp () {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore(app);
        return app;
    } catch (error) {
        console.log(error);
    }
};

//add data to database
export async function uploadProcessedData (noMeteran, nama, alamat, kota) {
    const dataToUpload = {
        noMeteran: 'test2',
        nama: 123,
        alamat: new Date(),
        kota: 'test2',
    };
    const date = new Date();
    //mendapatkan tanggal dan jam sekarang
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const second = date.getSeconds();
    //mengubah format tanggal menjadi format yyyy-mm-dd
    const formattedDate = `${year}${month}${day}${second}`;
    console.log(formattedDate);
    console.log(typeof formattedDate);
    try {
        const document = doc(firestoreDb, 'receipts', formattedDate);
        let dataUpdated = await setDoc(document, dataToUpload);
        console.log('Data updated: ', dataUpdated);
        return dataUpdated;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

//Get all data collection
export async function getAllDataCollection (){
    try{
        const collectionRef = collection(firestoreDb, 'customers');
        const finalData = [];

        const q = query(collectionRef);
        const docSnap = await getDocs(q);

        docSnap.forEach(doc => {
            finalData.push(doc.data());
        });
        return finalData;
    }catch{
        console.log(error);
    }
}

//Get data by request
export async function getDataByRequest (id){
    try{
        const collectionRef = collection(firestoreDb, 'customers');
        const finalData = [];

        const q = query(collectionRef, where('id_pelanggan', '==', id));
        const docSnap = await getDocs(q);

        docSnap.forEach(doc => {
            finalData.push(doc.data());
        });
        console.log(finalData);
        return finalData;
    }catch(error){
        console.log(error);
    }
}

//get all data subCollection
export async function getAllDataSubCollection(id){
    try{
        const collectionRef = collection(firestoreDb, 'customers');
        const finalData = [];

        const q = query(collectionRef, where('id_pelanggan', '==', id));
        const docSnap = await getDocs(q);

        const promises = docSnap.docs.map( async (doc) => {
            const subcollectionRef = collection(firestoreDb, 'customers', doc.id, 'data');
            const subcollectionSnapshot = await getDocs(subcollectionRef);
            subcollectionSnapshot.forEach(subdoc => {
                // console.log('Subcollection document id:', subdoc.id, ' => ', subdoc.data());
                finalData.push(subdoc.data());
            });
        });
        await Promise.all(promises);
        // console.log(finalData);
        return finalData;
    }catch (error){
        console.log(error);
        return error;
    }
}
//delete data
export async function deleteData(id) {
    try {
        const collectionRef = collection(firestoreDb, 'customers');
        const q = query(collectionRef, where('id_pelanggan', '==', id));
        const docSnap = await getDocs(q);
        
        const promises = docSnap.docs.map(async (doc) => {
            const subcollectionRef = collection(firestoreDb, 'customers', doc.id, 'data');
            const subcollectionSnapshot = await getDocs(subcollectionRef);
            subcollectionSnapshot.forEach(async (subdoc) => {
                await deleteDoc(subdoc.ref); // Menunggu hingga penghapusan selesai
            });
            await deleteDoc(doc.ref); // Menunggu hingga penghapusan selesai
        });
        await Promise.all(promises); // Menunggu hingga semua operasi selesai
        console.log("Data berhasil dihapus");
    } catch (error) {
        console.log(error);
        console.log("Terjadi kesalahan saat menghapus data");
    }
}

const getFirebaseApp = () => app;

export default {
    initializeFirebaseApp,
    getFirebaseApp,
};
