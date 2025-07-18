// scripts/admin.js
import { db } from "./firebaseConfig.js";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { logAction } from "./logger.js";

async function addCategory(name) {
  try {
    await addDoc(collection(db, "categories"), { name });
    logAction("admin", "Category Added", name);
  } catch (err) {
    console.error("Add Category Error:", err);
  }
}

async function addCity(city, areas = []) {
  try {
    await setDoc(doc(db, "cities", city), { areas });
    logAction("admin", "City Added/Updated", city);
  } catch (err) {
    console.error("Add City Error:", err);
  }
}

async function deleteSport(eventId) {
  try {
    await deleteDoc(doc(db, "events", eventId));
    logAction("admin", "Event Deleted", eventId);
  } catch (err) {
    console.error("Delete Event Error:", err);
  }
}

window.addCategory = addCategory;
window.addCity = addCity;
window.deleteSport = deleteSport;
