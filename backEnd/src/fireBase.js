const { initializeApp } = require( "firebase/app")
const { getFirestore, getDocs,collection, query, where, orderBy, limit } = require( 'firebase/firestore')
const { doc, setDoc, addDoc } = require("firebase/firestore"); 

const firebaseConfig = {
  apiKey: "AIzaSyBduO3u03eT5Hyf-Fpm-jsrC1fedlrVBGw",
  authDomain: "chat-app-e7f11.firebaseapp.com",
  projectId: "chat-app-e7f11",
  storageBucket: "chat-app-e7f11.appspot.com",
  messagingSenderId: "240423698183",
  appId: "1:240423698183:web:9db6d38486c9eda2fc4fa2",
  measurementId: "G-9ZRR52KFMS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const getData = async(colName)=> {
    const col = collection(db, colName)
    const q = query(col, orderBy("timeStamp"));
    const snapShot = await getDocs(q);
    const result = snapShot.docs.map(doc => doc.data());
    return result;
  }
  
  const addData = async(colName, data)=>{
      const docRef = await addDoc(collection(db, colName), data);
      console.log('something was added to firebase'+" "+docRef)
    }

    const usersPromise = getData('users')
    const messagesPromise = getData('messages')
    const roomsPromise = getData('rooms')

  module.exports = {usersPromise, messagesPromise, roomsPromise, addData, getData}