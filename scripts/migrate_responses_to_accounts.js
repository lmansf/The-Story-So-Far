/*
Migration script: consolidate latest responses per user into accounts/{uid} documents.

Usage:
- Provide Firebase Admin credentials via GOOGLE_APPLICATION_CREDENTIALS env var
- Run: node scripts/migrate_responses_to_accounts.js

This script will:
- Read `responses` collection
- For each uid, determine latest value per questionId
- Write accounts/{uid} documents with fields question_one..question_four (or question_unknown)

Caveats:
- This uses the Admin SDK and must be run with adequate privileges.
- Test on a small dataset first.
*/

const admin = require('firebase-admin');
const path = require('path');

async function main(){
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS){
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
    process.exit(1);
  }

  admin.initializeApp();
  const db = admin.firestore();

  console.log('Reading responses...');
  const respSnap = await db.collection('responses').orderBy('createdAt', 'asc').get();
  console.log('Total responses:', respSnap.size);

  const latest = {}; // { uid: { question_key: value } }

  respSnap.forEach(doc => {
    const d = doc.data();
    const uid = d.uid;
    const q = d.questionId || 'question_unknown';
    const val = d.value || null;
    if (!uid) return;
    if (!latest[uid]) latest[uid] = {};
    // overwrite as we iterate ascending, so final one is latest
    latest[uid][q] = val;
  });

  console.log('Preparing to write accounts for', Object.keys(latest).length, 'users');

  let count = 0;
  for (const uid of Object.keys(latest)){
    const payload = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
    const userBlock = latest[uid];
    for (const q of Object.keys(userBlock)){
      payload[q] = userBlock[q] == null ? 'unanswered' : String(userBlock[q]);
    }
    // ensure common fields exist
    if (!('question_one' in payload)) payload.question_one = 'unanswered';
    if (!('question_two' in payload)) payload.question_two = 'unanswered';
    if (!('question_three' in payload)) payload.question_three = 'unanswered';
    if (!('question_four' in payload)) payload.question_four = 'unanswered';

    await db.collection('accounts').doc(uid).set(payload, { merge: true });
    count++;
  }

  console.log('Wrote accounts for', count, 'users');
}

main().catch(err => { console.error(err); process.exit(2); });
