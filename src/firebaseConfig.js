// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxZ-CMJtD9DmyEDXoTx0AUpw7dqXVb7lc",
  authDomain: "freshtrack-1a8bb.firebaseapp.com",
  projectId: "freshtrack-1a8bb",
  storageBucket: "freshtrack-1a8bb.firebasestorage.app",
  messagingSenderId: "353789922461",
  appId: "1:353789922461:web:9882ab100e9e08b5265874",
  measurementId: "G-S8CHT3VCG7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // 🔥 Firestore Database

export { auth, db };
