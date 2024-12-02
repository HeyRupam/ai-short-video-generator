// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-ee4c9.firebaseapp.com",
  projectId: "ai-short-video-generator-ee4c9",
  storageBucket: "ai-short-video-generator-ee4c9.firebasestorage.app",
  messagingSenderId: "518774640092",
  appId: "1:518774640092:web:32ae572fb8aef456339319",
  measurementId: "G-YJ2JTTVF6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);