import { auth, db } from "./firebase.js";
import {
  doc, getDoc, updateDoc,
  arrayUnion, increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const modelId = new URLSearchParams(location.search).get("id");

document.getElementById("downloadBtn").addEventListener("click", async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("Login required to download");
    location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const modelRef = doc(db, "models", modelId);

  const userSnap = await getDoc(userRef);

  if (!userSnap.data().downloadedModels?.includes(modelId)) {
    await updateDoc(userRef, {
      downloadedModels: arrayUnion(modelId)
    });

    await updateDoc(modelRef, {
      downloads: increment(1),
      downloadedBy: arrayUnion(user.uid)
    });
  }

  const modelSnap = await getDoc(modelRef);
  window.open(modelSnap.data().downloadlink);
});
