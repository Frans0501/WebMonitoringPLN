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

const getDataUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  
  const allData = [];

  querySnapshot.forEach((doc) => {
    const userData = {
      id: doc.id,
      mainData: doc.data(),
      subCollectionData: []
    };

    allData.push(userData);
  });

  await Promise.all(querySnapshot.docs.map(async (doc, index) => {
    const subcollectionRef = collection(db, 'users', doc.id, 'data');
    const subcollectionSnapshot = await getDocs(subcollectionRef);

    subcollectionSnapshot.docs.forEach(subdoc => {
      const userDataIndex = allData.findIndex(item => item.id === doc.id);
      allData[userDataIndex].subCollectionData.push({
        id: subdoc.id,
        data: subdoc.data()
      });
    });
  }));

  return allData;
}

const getDataAdmin = async () => {
  const querySnapshot = await getDocs(collection(db, 'admin'));
  const adminDataArray = [];

  querySnapshot.forEach((doc) => {
      adminDataArray.push({
          id: doc.id,
          data: doc.data()
      });
  });

  return adminDataArray;
}


// getDataUsers();
// getDataAdmin();

export {getDataUsers, getDataAdmin};