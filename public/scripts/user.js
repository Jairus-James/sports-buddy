import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { logAction } from "./logger.js";

export async function addEvent(eventData) {
  const eventWithTimestamp = {
    ...eventData,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, "events"), eventWithTimestamp);
  await logAction(eventData.userId, "Event Added", eventData.name);
  return docRef;
}

export async function getEventsForUser(userId) {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const events = [];
  querySnapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() });
  });
  return events;
}

export async function updateEvent(eventId, eventData) {
  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, eventData);
  await logAction(eventData.userId, "Event Updated", eventId);
}

export async function deleteEvent(eventId, userId) {
  await deleteDoc(doc(db, "events", eventId));
  await logAction(userId, "Event Deleted", eventId);
}
