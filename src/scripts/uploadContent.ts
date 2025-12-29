import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔹 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBNWEe0b5XrZuFkjg0G0NrEnm9q9_yG8sQ",
  authDomain: "scameleon-4206e.firebaseapp.com",
  projectId: "scameleon-4206e",
  storageBucket: "scameleon-4206e.firebasestorage.app",
  messagingSenderId: "316713264297",
  appId: "1:316713264297:web:e14f7303772deb79bdb5b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Your JSON arrays
interface ContentItem {
  category: string;
  contentType: string;
  title: string;
  sourceUrl: string;
}

const articles: ContentItem[] = [
  {
    category: "Tech Support Scams",
    contentType: "article",
    title: "How To Spot, Avoid, and Report Tech Support Scams",
    sourceUrl:
      "https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams",
  },
  {
    category: "Psychology Behind Scams",
    contentType: "article",
    title: "Why Do People Fall Prey to Scams",
    sourceUrl:
      "https://www.scamshield.gov.sg/why-do-people-fall-prey-to-scams/",
  },
  {
    category: "Phishing Scams",
    contentType: "article",
    title: "Business Email Compromise",
    sourceUrl:
      "https://www.aarp.org/money/scams-fraud/business-email-compromise/",
  },
  {
    category: "Safety Tips",
    contentType: "article",
    title: "Online Safety Tips For Older Adults",
    sourceUrl:
      "https://www.staysafeonline.org/articles/online-safety-tips-for-older-adults",
  },
  {
    category: "Airbnb Scams",
    contentType: "article",
    title: "How to Avoid Airbnb Scams as a Host or a Guest",
    sourceUrl: "https://www.wikihow.com/Airbnb-Scams",
  },
  {
    category: "Travel Scams",
    contentType: "article",
    title: "Avoid Scams When You Travel",
    sourceUrl: "https://consumer.ftc.gov/articles/avoid-scams-when-you-travel",
  },
];

const videos: ContentItem[] = [
  {
    category: "Online Shopping Scams",
    contentType: "video",
    title: "Don't Get Duped by These Online Shopping Scams",
    sourceUrl: "https://www.youtube.com/watch?v=qhEx9nsZpUI",
  },
  {
    category: "Phishing Scams",
    contentType: "video",
    title: "Phishing - A Game of Deception",
    sourceUrl: "https://www.youtube.com/watch?v=WNVTGTrWcvw",
  },
  {
    category: "Romance Scams",
    contentType: "video",
    title: "I Fell For A Love Scam: How They Made It Seem So Real",
    sourceUrl: "https://www.youtube.com/watch?v=bzWprvJyzZs",
  },
  {
    category: "Identity Theft Scams",
    contentType: "video",
    title: "Identity Theft",
    sourceUrl:
      "https://www.youtube.com/watch?v=n-ojJvcGeAc&list=PL64JyPgl9bRGSTkyM2elOgij1gpwiXS2w&index=3",
  },
  {
    category: "Investment Scams",
    contentType: "video",
    title: "How Crypto Investment Scams Work",
    sourceUrl: "https://www.youtube.com/watch?v=vUE03dqE0Zw&t=11s",
  },
  {
    category: "Deepfake Scams",
    contentType: "video",
    title: "AI Deepfake Scam 2025: How They Steal Your Face, Voice & Money!",
    sourceUrl: "https://www.youtube.com/watch?v=mGjkOKGuXHk",
  },
];

// 🔹 Function to upload content
async function uploadContent(array: ContentItem[], collectionName: string) {
  for (const item of array) {
    try {
      const docRef = await addDoc(collection(db, collectionName), item);
      console.log(`Document added to ${collectionName} with ID:`, docRef.id);
    } catch (e) {
      console.error("Error adding document:", e);
    }
  }
}

// 🔹 Upload both articles and videos
async function runUpload() {
  console.log("Uploading articles...");
  await uploadContent(articles, "articles");

  console.log("Uploading videos...");
  await uploadContent(videos, "videos");

  console.log("✅ All content uploaded!");
}

runUpload();
