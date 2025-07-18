// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfGBTDiGVMuFox5NMIXs3RsOKsRlp6twU",
  authDomain: "sports-buddy-681eb.firebaseapp.com",
  projectId: "sports-buddy-681eb",
  storageBucket: "sports-buddy-681eb.firebasestorage.app",
  messagingSenderId: "480735015643",
  appId: "1:480735015643:web:c826150df9203f929792fe",
  measurementId: "G-EX5PR0PD39",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
