// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKbblz585u6ibBfcuAUUkL3cZ4wVkuFK8",
  authDomain: "house-marketplace-app-3a373.firebaseapp.com",
  projectId: "house-marketplace-app-3a373",
  storageBucket: "house-marketplace-app-3a373.appspot.com",
  messagingSenderId: "697660879146",
  appId: "1:697660879146:web:68cff12ef3419c09aeee53",
  measurementId: "G-36LBNSNG3L",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
