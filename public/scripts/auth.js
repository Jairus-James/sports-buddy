// public/scripts/auth.js

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { auth } from "./firebaseConfig.js";  // Make sure firebaseConfig.js exports auth
import { logAction } from "./logger.js";

// ✅ REGISTER
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      logAction(email, "User Registered");
      alert("Registration successful!");
    })
    .catch((error) => {
      console.error("Registration error:", error);
      alert("Registration failed: " + error.message);
    });
}

// ✅ LOGIN
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      logAction(email, "User Logged In");
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    });
}
