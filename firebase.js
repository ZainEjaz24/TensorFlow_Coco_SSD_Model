// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKkmXYKml5CmLBJmf6dDfOF46Hcm2Nm80",
  authDomain: "mad-quiz-ec3c4.firebaseapp.com",
  projectId: "mad-quiz-ec3c4",
  storageBucket: "mad-quiz-ec3c4.appspot.com",
  messagingSenderId: "484775386674",
  appId: "1:484775386674:web:e2484d7ae746970fe6e62b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
