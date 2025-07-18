// scripts/user.js
import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { logAction } from "./logger.js";

async function addEvent(eventData) {
  try {
    await addDoc(collection(db, "events"), {
      ...eventData,
      createdAt: new Date(),
    });
    logAction(eventData.user, "Event Added", eventData.name);
    alert("Event added successfully!");
  } catch (error) {
    console.error("Add Event Error:", error);
  }
}

async function displayEvents() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const eventList = document.getElementById("eventsList");
  eventList.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.name} - ${data.area}, ${data.city} @ ${data.time}`;
    eventList.appendChild(li);
  });
}

window.addEvent = addEvent;
window.displayEvents = displayEvents;
