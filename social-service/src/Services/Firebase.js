import { initializeApp } from "firebase/app";  // Import initializeApp from firebase/app
import { getAuth } from "firebase/auth";        // Import getAuth from firebase/auth
import { getFirestore, collection, addDoc } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwMbcft-KX1ztQqhQUEerTKgagHo1p_V8",
  authDomain: "social-service-a515b.firebaseapp.com",
  projectId: "social-service-a515b",
  storageBucket: "social-service-a515b.firebasestorage.app",
  messagingSenderId: "1079058072792",
  appId: "1:1079058072792:web:cbd7d85fbda636f4ff43ad",
  measurementId: "G-JRYTNELS7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Auth
const db = getFirestore(app); // Initialize Firestore

// Export the instances so you can use them in your app
export { db, addDoc, collection,auth };