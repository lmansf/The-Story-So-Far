// Main loader: queries Firestore for unlocked question(s) and loads into an iframe
import { db, storage, auth } from './firebase-init.js';
import { collection, query, where, orderBy, limit, getDocs, addDoc, serverTimestamp, doc as docRef, getDoc, setDoc } from 'firebase/firestore';
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

      // Ensure an accounts document exists with default unanswered responses and load profile (color scheme) if present
      try {
        await ensureAccountDoc(user);
        const profileRef = docRef(db, 'profiles', user.uid);
        const snap = await getDoc(profileRef);
        if (snap && snap.exists()) {
          const data = snap.data();
          if (data && data.colorScheme) applyTheme(data.colorScheme);
        }
      } catch (err) {
        console.warn('Failed to load or create profile/account', err);
      }
    } else {
      // Hide game until signed in
      if (userInfo) { userInfo.style.display = 'none'; }
      if (signInArea) { signInArea.style.display = ''; }
      if (gameArea) { gameArea.style.display = 'none'; }
      showMessage('Please sign in to play.');
    }
  });
});

// Ensure an accounts document exists for the user with default unanswered fields
async function ensureAccountDoc(user){
  if (!user || !user.uid) return;
  try{
    const accRef = docRef(db, 'accounts', user.uid);
    const snap = await getDoc(accRef);
    const defaults = {
      email: user.email || null,
      question_one: 'unanswered',
      question_two: 'unanswered',
      question_three: 'unanswered',
      question_four: 'unanswered',
      updatedAt: serverTimestamp()
    };
    if (!snap.exists()){
      await setDoc(accRef, defaults);
    } else {
      // Make sure email is up-to-date and any missing question fields are set to 'unanswered'
      const existing = snap.data() || {};
      const toMerge = { email: user.email || existing.email || null, updatedAt: serverTimestamp() };
      if (!('question_one' in existing)) toMerge.question_one = 'unanswered';
      if (!('question_two' in existing)) toMerge.question_two = 'unanswered';
      if (!('question_three' in existing)) toMerge.question_three = 'unanswered';
      if (!('question_four' in existing)) toMerge.question_four = 'unanswered';
      await setDoc(accRef, toMerge, { merge: true });
    }
  }catch(err){
    console.warn('ensureAccountDoc failed', err);
  }
}

function getQuestionKeyFromPath(){
  const p = (location.pathname || '').toLowerCase();
  if (p.endsWith('questionone.html') || p.endsWith('index.html') || p === '/' ) return 'question_one';
  if (p.endsWith('questiontwo.html')) return 'question_two';
  if (p.endsWith('questionthree.html')) return 'question_three';
  if (p.endsWith('questionfour.html')) return 'question_four';
  // fallback: derive from document.title
  const t = (document.title || '').toLowerCase();
  if (t.includes('one')) return 'question_one';
  if (t.includes('two')) return 'question_two';
  if (t.includes('three')) return 'question_three';
  if (t.includes('four')) return 'question_four';
  return 'question_unknown';
}

function applyTheme(choice){
  // choice: 'red' or 'blue'
  const root = document.documentElement;
  if (!root) return;
  if (choice === 'red'){
    root.style.setProperty('--bg-start', '#ff5f6d');
    root.style.setProperty('--bg-end', '#ffc371');
  } else {
    // default blue
    root.style.setProperty('--bg-start', '#667eea');
    root.style.setProperty('--bg-end', '#764ba2');
  }
}

// Allow setting a persistent color scheme for the signed-in user
window.setColorScheme = async function(choice){
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');
  try{
    const profileRef = docRef(db, 'profiles', user.uid);
    await setDoc(profileRef, { colorScheme: choice }, { merge: true });
    applyTheme(choice);
    return { ok: true };
  }catch(err){
    console.error('Failed to set color scheme', err);
    return { ok: false, error: err };
  }
};

// Expose a global logging function that saves responses tied to the signed-in user
window.logSelection = async function (isDate, selectedDate) {
  const user = auth.currentUser;
  if (!user) {
    // If not signed in, we still return a rejected promise so callers can handle it.
    throw new Error('User not signed in');
  }

  const questionKey = getQuestionKeyFromPath();
  // Decide the value to store: prefer explicit selectedDate, else interpret isDate/Now/other
  let value = null;
  if (selectedDate) value = selectedDate;
  else value = (!!isDate) ? 'date' : 'Now';

  const responseDoc = {
    questionId: questionKey,
    value,
    userEmail: user.email || null,
    uid: user.uid || null,
    createdAt: serverTimestamp()
  };

  try {
    // write a historical entry into `responses` collection
    await addDoc(collection(db, 'responses'), responseDoc);
  } catch (err) {
    console.error('Failed to log response in responses collection', err);
  }

  try{
    // update the user's accounts doc to store the latest answer per question
    const accRef = docRef(db, 'accounts', user.uid);
    const fieldObj = { updatedAt: serverTimestamp() };
    fieldObj[questionKey] = value || 'unanswered';
    if (user.email) fieldObj.email = user.email;
    await setDoc(accRef, fieldObj, { merge: true });
  }catch(err){
    console.error('Failed to update account response', err);
  }

  return { ok: true };
};

// Expose small auth helpers for pages that include the bundle
window.getCurrentUser = function(){ return auth.currentUser; };

window.promptSignIn = async function(){
  try{
    await signInWithPopup(auth, provider);
    return { ok: true };
  }catch(err){
    console.error('promptSignIn failed', err);
    return { ok: false, error: err };
  }
};

export {};
