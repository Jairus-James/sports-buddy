// public/scripts/logger.js

import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function logAction(user, action, details = '') {
  try {
    await addDoc(collection(db, "logs"), {
      user,
      action,
      details,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Logging error:", error);
  }
}
