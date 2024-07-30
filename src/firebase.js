// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Add this line
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNlJno88FY_D1lvPSjPVfuUQ3hdPq1yws",
  authDomain: "mining-49bc7.firebaseapp.com",
  projectId: "mining-49bc7",
  storageBucket: "mining-49bc7.appspot.com",
  messagingSenderId: "732353529395",
  appId: "1:732353529395:web:7599aa79336fa6efa74546",
  measurementId: "G-TGP934ETM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

export { auth };
export default app;