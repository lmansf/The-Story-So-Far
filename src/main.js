// Main loader: queries Firestore for unlocked question(s) and loads into an iframe
import { db, storage, auth } from './firebase-init.js';
import { collection, query, where, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const provider = new GoogleAuthProvider();

function formatDateISO(date = new Date()) {
  return date.toISOString().split('T')[0];
}

async function getLatestUnlockedQuestion() {
  const today = formatDateISO();
  const q = query(
    collection(db, 'questions'),
    where('active', '==', true),
    where('releaseDate', '<=', today),
    orderBy('releaseDate', 'desc'),
    limit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data();
}

async function loadQuestionIntoIframe(folderPath) {
  const htmlRef = storageRef(storage, `${folderPath}/index.html`);
  const url = await getDownloadURL(htmlRef);
  const iframe = document.getElementById('questionFrame');
  iframe.src = url;
}

function showMessage(msg) {
  const el = document.getElementById('message');
  if (el) el.textContent = msg;
}

// Auth gating: require sign-in before showing the game
document.addEventListener('DOMContentLoaded', () => {
  const signInBtn = document.getElementById('signInBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  const userInfo = document.getElementById('userInfo');
  const userEmail = document.getElementById('userEmail');
  const signInArea = document.getElementById('signInArea');
  const gameArea = document.getElementById('gameArea');

  if (signInBtn) {
    signInBtn.addEventListener('click', async () => {
      try {
        await signInWithPopup(auth, provider);
      } catch (err) {
        console.error('Sign-in failed', err);
        showMessage('Sign-in failed: ' + (err.message || err));
      }
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener('click', async () => {
      await signOut(auth);
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Show game
      if (userInfo) { userInfo.style.display = ''; }
      if (userEmail) { userEmail.textContent = user.email || user.uid; }
      if (signInArea) { signInArea.style.display = 'none'; }
      if (gameArea) { gameArea.style.display = ''; }
      showMessage('Signed in as ' + (user.email || user.uid));

      // Optionally preload content or perform actions requiring auth
    } else {
      // Hide game until signed in
      if (userInfo) { userInfo.style.display = 'none'; }
      if (signInArea) { signInArea.style.display = ''; }
      if (gameArea) { gameArea.style.display = 'none'; }
      showMessage('Please sign in to play.');
    }
  });
});

// Expose a global logging function that saves responses tied to the signed-in user
window.logSelection = async function (isDate, selectedDate) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  const questionId = document.title || 'question_one';
  const doc = {
    questionId,
    isDate: !!isDate,
    selectedDate: selectedDate || null,
    userEmail: user.email || null,
    uid: user.uid || null,
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, 'responses'), doc);
    return { ok: true };
  } catch (err) {
    console.error('Failed to log response', err);
    return { ok: false, error: err };
  }
};

export {};
