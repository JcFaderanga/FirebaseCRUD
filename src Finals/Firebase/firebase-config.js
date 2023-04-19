import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDUWWEaiikaGhH_gzLpXZlH7w3FpHZ87gs",
    authDomain: "finals-activity1.firebaseapp.com",
    projectId: "finals-activity1",
    storageBucket: "finals-activity1.appspot.com",
    messagingSenderId: "66024460856",
    appId: "1:66024460856:web:7eaf63c66cb320133d8ccd",
    measurementId: "G-BTFFB9BVFG",
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);