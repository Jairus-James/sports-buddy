import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { auth, db } from "./firebaseConfig.js";
import { logAction } from "./logger.js";

export async function register(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const role = email === "admin123@gmail.com" ? "admin" : "user";

  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    role: role,
  });
  await logAction(email, "User Registered");
  return userCredential;
}

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await logAction(email, "User Logged In");
  return userCredential;
}

export async function getUserRole(userId) {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data().role;
  }
  console.error("No user document found for UID:", userId);
  return null;
}

export async function updateUserRole(userId, newRole) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    role: newRole,
  });
  await logAction("system", "User Role Updated", `User ${userId} to ${newRole}`);
}

export function onAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
