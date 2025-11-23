// Initialize Firebase using modular SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIbQBmou63triRfAmCG0iTPFXcbho0r4U",
  authDomain: "the-story-so-far-c474f.firebaseapp.com",
  projectId: "the-story-so-far-c474f",
  storageBucket: "the-story-so-far-c474f.firebasestorage.app",
  messagingSenderId: "518541790890",
  appId: "1:518541790890:web:7d8f1ee180e50616070ad3",
  measurementId: "G-X4V7G3J3JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics may not be available in non-browser or if blocked; guard it
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (err) {
  // Fail gracefully in environments without analytics support
  // eslint-disable-next-line no-console
  console.warn('Firebase analytics not initialized:', err?.message || err);
}

// Firestore and Storage instances
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, analytics, db, storage, auth };
