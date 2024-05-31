import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAvni_hfG1MOJlpg4z6rWu_PWnXdmEJeoM",
  authDomain: "tweeter-2d057.firebaseapp.com",
  projectId: "tweeter-2d057",
  storageBucket: "tweeter-2d057.appspot.com",
  messagingSenderId: "539183739438",
  appId: "1:539183739438:web:c23f6778618ed9b7bee5bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, getDocs, addDoc, onSnapshot, query, where, doc, updateDoc, auth };
