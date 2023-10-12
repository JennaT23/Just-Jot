// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDRtwhRCdUoVXxbU5DHeViwyrEPotblQk",
  authDomain: "justjot-844c4.firebaseapp.com",
  projectId: "justjot-844c4",
  storageBucket: "justjot-844c4.appspot.com",
  messagingSenderId: "634411803562",
  appId: "1:634411803562:web:2d9dec7081d59676c841d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Initialize auth using the app instance

export { auth };
