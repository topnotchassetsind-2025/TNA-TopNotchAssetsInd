
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const firebaseConfig = {
   apiKey: "AIzaSyBy5JEPEcplViq8AkK-_uY8JXU5iHUM6ns",
  authDomain: "top-notch-log-data.firebaseapp.com",
  projectId: "top-notch-log-data"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

