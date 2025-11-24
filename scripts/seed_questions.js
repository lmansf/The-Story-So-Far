/*
Seed script to create initial `questions` documents in Firestore.

Usage:
- Set `GOOGLE_APPLICATION_CREDENTIALS` to a service account JSON with proper Firestore permissions.
- Run: node scripts/seed_questions.js

This will create documents under `questions/{id}` with fields used by the app:
- id, title, releaseDate (YYYY-MM-DD), folderPath, active, createdAt

Be careful: this writes to your production Firestore.
*/

const admin = require('firebase-admin');

async function main(){
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS){
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
    process.exit(1);
  }

  admin.initializeApp();
  const db = admin.firestore();

  // Adjust release dates as needed
  const today = new Date();
  const fmt = (d) => d.toISOString().split('T')[0];

  const questions = [
    {
      id: 'question_one',
      title: 'When does the first question start?',
      releaseDate: fmt(new Date(today)),
      folderPath: 'questions/question_one',
      active: true
    },
    {
      id: 'question_two',
      title: 'Does every question even have an answer?',
      releaseDate: fmt(new Date(today)),
      folderPath: 'questions/question_two',
      active: true
    },
    {
      id: 'question_three',
      title: 'Red or Blue?',
      releaseDate: fmt(new Date(today)),
      folderPath: 'questions/question_three',
      active: true
    },
    {
      id: 'question_four',
      title: 'How many?',
      releaseDate: fmt(new Date(today)),
      folderPath: 'questions/question_four',
      active: true
    }
  ];

  for (const q of questions){
    const ref = db.collection('questions').doc(q.id);
    await ref.set({ ...q, createdAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    console.log('Wrote', q.id);
  }

  console.log('Seed complete');
}

main().catch(err => { console.error(err); process.exit(2); });
