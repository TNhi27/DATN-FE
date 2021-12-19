import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQcG8OshRu1BSch3TITvXc2jXPuQtwh-w",
  authDomain: "datn-2021.firebaseapp.com",
  databaseURL: "https://datn-2021-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "datn-2021",
  storageBucket: "datn-2021.appspot.com",
  messagingSenderId: "543047331055",
  appId: "1:543047331055:web:c30c96ae91f85dc7357f1a",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database =getDatabase(app);

export default database;
