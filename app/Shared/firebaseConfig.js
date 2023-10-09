// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrgAzHtkf4m-38AV3eIDYSywsUF3vCifQ",
  authDomain: "kite-401421.firebaseapp.com",
  projectId: "kite-401421",
  storageBucket: "kite-401421.appspot.com",
  messagingSenderId: "950102292403",
  appId: "1:950102292403:web:0139d30eded029044fbdc6",
  measurementId: "G-H1Y5BR1JQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;