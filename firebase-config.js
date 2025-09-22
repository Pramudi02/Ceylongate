// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIY5Sw-L_6oJOVODVWIcA2Y-fc5JAkeaU",
  authDomain: "ceylongate-cf09b.firebaseapp.com",
  projectId: "ceylongate-cf09b",
  storageBucket: "ceylongate-cf09b.firebasestorage.app",
  messagingSenderId: "802447795960",
  appId: "1:802447795960:web:fb6d85c047e440a8cfbd0d",
  measurementId: "G-CLVS0XZL47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);