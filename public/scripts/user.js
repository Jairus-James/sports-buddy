import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { logAction } from "./logger.js";

export function addEvent(eventData) {
  addDoc(collection(db, "events"), {
    ...eventData,
    createdAt: serverTimestamp()
  }).then(() => {
    logAction(eventData.user, "Event Added", eventData.name);
    alert("Event added successfully!");
  }).catch(error => console.error("Add Event Error:", error));
}
