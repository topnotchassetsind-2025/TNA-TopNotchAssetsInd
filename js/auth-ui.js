import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const profileBox = document.getElementById("profileBox");
const dropdown = document.getElementById("profileDropdown");
const userEmail = document.getElementById("userEmail");
const avatar = document.getElementById("profileAvatar");
if (loginBtn && profileBox) {
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    profileBox.style.display = "block";
    userEmail.innerText = user.email;
    if (user.photoURL) avatar.src = user.photoURL;
  } else {
    loginBtn.style.display = "block";
    profileBox.style.display = "none";
  }
});

profileBox.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

window.logout = () => {
  signOut(auth).then(() => {
    location.reload();
  });
};
}