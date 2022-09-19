import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, 
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKzavR6wS2P8wZwhDeTlG0B6DcZLiYJ34",
  authDomain: "bookhunter-4ebe9.firebaseapp.com",
  projectId: "bookhunter-4ebe9",
  storageBucket: "bookhunter-4ebe9.appspot.com",
  messagingSenderId: "812212781131",
  appId: "1:812212781131:web:a8bcfce469f9160872cdce",
  measurementId: "G-66N2G0590X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

enableIndexedDbPersistence(db)
  .catch((err) => {
    console.log(err.message);
  });

export { auth, db }