// scripts/logger.js
import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function logAction(user, action, details = "") {
  try {
    await addDoc(collection(db, "logs"), {
      user,
      action,
      details,
      timestamp: new Date(),
    });
    console.log(`[LOG] ${user}: ${action} - ${details}`);
  } catch (err) {
    console.error("Logging error:", err);
  }
}

export { logAction };
