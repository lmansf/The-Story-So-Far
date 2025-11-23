// Main loader: queries Firestore for unlocked question(s) and loads into an iframe
import { db, storage } from './firebase-init.js';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';

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
  el.textContent = msg;
}

document.addEventListener('DOMContentLoaded', async () => {
  showMessage('Checking for today\'s unlocked question...');
  try {
    const q = await getLatestUnlockedQuestion();
    if (!q) {
      showMessage('No unlocked questions for today. Check back later.');
      return;
    }

    const titleEl = document.getElementById('questionTitle');
    titleEl.textContent = q.title || 'Untitled Question';
    showMessage(`Loaded question: ${q.id || q.title || ''}`);
    await loadQuestionIntoIframe(q.folderPath);
  } catch (err) {
    console.error(err);
    showMessage('Error loading question. See console for details.');
  }
});

export {};
