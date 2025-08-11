import { db } from "./firebaseConfig.js";
import { collection, addDoc, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { logAction } from "./logger.js";

export function addCategory(name) {
  addDoc(collection(db, "categories"), { name })
    .then(() => logAction("admin", "Category Added", name))
    .catch(err => console.error("Add Category Error:", err));
}

export function addCity(name, areas) {
  setDoc(doc(db, "cities", name), { areas })
    .then(() => logAction("admin", "City Added/Updated", name))
    .catch(err => console.error("Add City Error:", err));
}

export function deleteSport(eventId) {
  deleteDoc(doc(db, "events", eventId))
    .then(() => logAction("admin", "Event Deleted", eventId))
    .catch(err => console.error("Delete Event Error:", err));
}
