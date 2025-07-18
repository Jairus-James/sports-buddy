import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Login function
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("✅ Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      alert("❌ Login failed: " + err.message);
    });
}

// Register function
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("✅ Registration successful!");
    })
    .catch((err) => {
      alert("❌ Registration failed: " + err.message);
    });
}
