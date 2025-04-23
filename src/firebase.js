// src/firebase.js

import { initializeApp } from 'firebase/app'; // This starts your Firebase app
import { getAuth } from 'firebase/auth';      // This gives access to Authentication
import { getFirestore } from 'firebase/firestore'; // This gives access to Firestore DB
import firebaseConfig from './firebaseConfig'; // Your Firebase keys/settings

// Initialize Firebase app using your config values
const app = initializeApp(firebaseConfig);

// Create Auth and DB services
const auth = getAuth(app);
const db = getFirestore(app);

// Export so you can use them in other files (like Login/Register/FoodList)
export { auth, db };
