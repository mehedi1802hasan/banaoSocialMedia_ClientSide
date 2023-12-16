// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3IYnSvjImna2MBcraJJRe7YTIoingRaA",
  authDomain: "banaosocialmediatask.firebaseapp.com",
  projectId: "banaosocialmediatask",
  storageBucket: "banaosocialmediatask.appspot.com",
  messagingSenderId: "978112991947",
  appId: "1:978112991947:web:08bddb0863217c0b31014e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;