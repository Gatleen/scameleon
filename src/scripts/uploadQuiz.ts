import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account JSON
const serviceAccountPath = path.resolve(
  __dirname,
  "../secrets/serviceAccountKey.json"
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load quiz JSON
const quizFilePath = path.resolve(__dirname, "./dailyQuizQuestions.json");
const quizData = JSON.parse(fs.readFileSync(quizFilePath, "utf8"));

// Firestore collection
const collectionRef = db.collection("dailyQuiz");

async function uploadQuestions() {
  try {
    for (const q of quizData.questions) {
      await collectionRef.add({
        ...q,
      });
      console.log(`Uploaded question: "${q.question}"`);
    }
    console.log("All questions uploaded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error uploading questions:", err);
    process.exit(1);
  }
}

uploadQuestions();
