import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFZow8OnO2hBD8y_jtyQY0NZdM-vRdM9c",
  authDomain: "cleber-702d3.firebaseapp.com",
  projectId: "cleber-702d3",
  storageBucket: "cleber-702d3.firebasestorage.app",
  messagingSenderId: "383653629265",
  appId: "1:383653629265:web:95de6d1009949342b7d770",
  measurementId: "G-RJV8EH3F6D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
