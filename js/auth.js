// js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* =========================
   FIREBASE CONFIG
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyBy5JEPEcplViq8AkK-_uY8JXU5iHUM6ns",
  authDomain: "top-notch-log-data.firebaseapp.com",
  projectId: "top-notch-log-data"
};

/* INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* =========================
   TOAST SYSTEM (JS ONLY)
========================= */
function showToast(message, type = "info") {
  let toast = document.getElementById("js-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "js-toast";
    document.body.appendChild(toast);
  }

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#6467ff"
  };

  toast.style.cssText = `
    position:fixed;
    top:30px;
    left:50%;
    transform:translateX(-50%);
    padding:18px 28px;
    border-radius:14px;
    font-size:18px;
    font-weight:600;
    background:${colors[type] || colors.info};
    color:#fff;
    box-shadow:0 20px 40px rgba(0,0,0,0.4);
    z-index:9999;
    opacity:0;
    transition:opacity .3s ease, transform .3s ease;
  `;

  toast.textContent = message;

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(-10px)";
  }, 3000);
}

/* =========================
   FORM HELPERS
========================= */
function clearForms() {
  ["loginEmail", "loginPassword", "signupEmail", "signupPassword"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

/* FLIP UI */
window.showLogin = function () {
  document.querySelector(".auth-container")?.classList.remove("show-signup");
  clearForms();
};

window.showSignup = function () {
  document.querySelector(".auth-container")?.classList.add("show-signup");
  clearForms();
};

/* =========================
   SIGN UP
========================= */
window.signupEmail = async function () {
  const emailEl = document.getElementById("signupEmail");
  const passEl = document.getElementById("signupPassword");

  if (!emailEl || !passEl) return;

  const email = emailEl.value.trim();
  const password = passEl.value.trim();

  if (!email || !password) {
    showToast("Please enter email and password", "error");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCred.user);

    showToast("Verification email sent. Please verify & login.", "success");

    clearForms();
    setTimeout(showLogin, 1200);

  } catch (err) {
    showToast(err.message, "error");
  }
};

/* =========================
   LOGIN
========================= */
window.loginEmail = async function () {
  const emailEl = document.getElementById("loginEmail");
  const passEl = document.getElementById("loginPassword");

  if (!emailEl || !passEl) return;

  const email = emailEl.value.trim();
  const password = passEl.value.trim();

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    if (!userCred.user.emailVerified) {
      showToast("Please verify your email before login", "error");
      await signOut(auth);
      return;
    }

    showToast("Login successful. Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);

  } catch (err) {
    showToast(err.message, "error");
  }
};

/* =========================
   GOOGLE LOGIN
========================= */
window.loginGoogle = async function () {
  try {
    await signInWithPopup(auth, provider);
    showToast("Login successful", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);

  } catch (err) {
    showToast(err.message, "error");
  }
};

/* =========================
   LOGOUT (OPTIONAL)
========================= */
window.logout = async function () {
  await signOut(auth);
  showToast("Logged out successfully", "info");
};
