import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBy5JEPEcplViq8AkK-_uY8JXU5iHUM6ns",
  authDomain: "top-notch-log-data.firebaseapp.com",
  projectId: "top-notch-log-data"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// GET ID FROM URL
const params = new URLSearchParams(window.location.search);
const modelId = params.get("id");

if (!modelId) {
  alert("Invalid model");
}

// FETCH MODEL
const modelRef = doc(db, "models", modelId);
const snap = await getDoc(modelRef);

if (!snap.exists()) {
  alert("Model not found");
}

const data = snap.data();

// SET DATA
document.getElementById("modelName").innerText = data.name;
document.getElementById("modelMeta").innerText =
  `${data.game} · ${data.category}`;

document.getElementById("modelDesc").innerText =
  data.description || "No description available";

document.getElementById("downloadCount").innerText =
  `⬇ ${data.downloads || 0} downloads`;

// PREVIEW (IMAGE / SKETCHFAB)
document.getElementById("modelFrame").src =
  data.previewEmbed || data.thumbnail;

// DOWNLOAD BUTTON
document.getElementById("downloadBtn").onclick = async () => {
  // Increase download count
  await updateDoc(modelRef, {
    downloads: increment(1)
  });

  // Redirect to Mega
  window.open(data.downloadlink, "_blank");
};
