import { storage, db } from './firebase-init.js';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

function el(id) { return document.getElementById(id); }

function normalizePath(path) {
  return path.replace(/\\/g, '/');
}

async function uploadFilesToStorage(folderPath, files) {
  const uploaded = [];
  for (const file of files) {
    // webkitRelativePath preserves folder structure when using webkitdirectory
    const relative = file.webkitRelativePath || file.name;
    const safeRelative = normalizePath(relative);
    const destPath = `${folderPath}/${safeRelative}`;
    const ref = storageRef(storage, destPath);
    await uploadBytes(ref, file);
    uploaded.push(destPath);
  }
  return uploaded;
}

async function createQuestionDoc(docData) {
  const col = collection(db, 'questions');
  const docRef = await addDoc(col, docData);
  return docRef.id;
}

document.addEventListener('DOMContentLoaded', () => {
  const uploadBtn = el('uploadBtn');
  const status = el('status');

  uploadBtn.addEventListener('click', async () => {
    const qid = el('qid').value.trim();
    const title = el('title').value.trim();
    const releaseDate = el('releaseDate').value;
    const active = el('active').checked;
    const files = el('folderInput').files;

    if (!files || files.length === 0) {
      status.textContent = 'No files selected. Choose a folder first.';
      return;
    }
    if (!qid) {
      status.textContent = 'Please enter a question ID.';
      return;
    }

    const folderPath = `questions/${qid}`;
    status.textContent = `Uploading ${files.length} file(s) to ${folderPath}...`;

    try {
      await uploadFilesToStorage(folderPath, files);

      // Create Firestore document
      const docData = {
        id: qid,
        title: title || qid,
        releaseDate: releaseDate || new Date().toISOString().split('T')[0],
        folderPath,
        active: !!active,
        createdAt: new Date().toISOString()
      };

      const createdId = await createQuestionDoc(docData);
      status.textContent = `Upload complete. Created question doc with id: ${createdId}`;
    } catch (err) {
      console.error(err);
      status.textContent = `Error: ${err.message || err}`;
    }
  });
});

export {};
