// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOAQGkVZecm6Nv14Notarg07W4YhQ3cnc",
  authDomain: "diarryapp-981ca.firebaseapp.com",
  projectId: "diarryapp-981ca",
  storageBucket: "diarryapp-981ca.appspot.com",
  messagingSenderId: "604034253816",
  appId: "1:604034253816:web:f9fa11000b5af2ebc64c0d",
  measurementId: "G-B11RZPMEEY",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
//const analytics = getAnalytics(app);

export { auth };
