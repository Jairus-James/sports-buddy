import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { logAction } from "./logger.js";

export async function addCategory(name) {
  await addDoc(collection(db, "categories"), { name });
  await logAction("admin", "Category Added", name);
}

export async function getCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
}

export async function deleteCategory(id) {
  await deleteDoc(doc(db, "categories", id));
  await logAction("admin", "Category Deleted", id);
}

export async function addCity(name, areas) {
  await setDoc(doc(db, "cities", name), { areas });
  await logAction("admin", "City Added/Updated", name);
}

export async function getCities() {
  const querySnapshot = await getDocs(collection(db, "cities"));
  const cities = [];
  querySnapshot.forEach((doc) => {
    cities.push({ id: doc.id, ...doc.data() });
  });
  return cities;
}

export async function addAreaToCity(cityName, areaName) {
  const cityRef = doc(db, "cities", cityName);
  await updateDoc(cityRef, {
    areas: arrayUnion(areaName),
  });
  await logAction("admin", "Area Added", `${areaName} to ${cityName}`);
}

export async function removeAreaFromCity(cityName, areaName) {
  const cityRef = doc(db, "cities", cityName);
  await updateDoc(cityRef, {
    areas: arrayRemove(areaName),
  });
  await logAction("admin", "Area Removed", `${areaName} from ${cityName}`);
}

export async function getEvents() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events = [];
  querySnapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() });
  });
  return events;
}

export async function updateEvent(eventId, eventData) {
  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, eventData);
  await logAction("admin", "Event Updated", eventId);
}

export async function deleteSport(eventId) {
  await deleteDoc(doc(db, "events", eventId));
  await logAction("admin", "Event Deleted", eventId);
}
