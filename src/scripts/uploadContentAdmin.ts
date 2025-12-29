// src/scripts/uploadContentAdmin.ts
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

//
// Dynamic import of firebase-admin to avoid import shape issues in ESM
//
let admin: any;
try {
  // Try dynamic import and support both default and named exports
  // top-level await is supported in modern Node when using ES modules
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = await import("firebase-admin");
  admin = mod?.default ?? mod;
} catch (err) {
  console.error(
    "❌ Failed to import firebase-admin. Did you install it? (npm install firebase-admin)"
  );
  console.error(err);
  process.exit(1);
}

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your service account key (adjust if you put it somewhere else)
const serviceAccountPath = path.resolve(
  __dirname,
  "../secrets/serviceAccountKey.json"
);

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Service account JSON not found at:", serviceAccountPath);
  console.error(
    "Put the downloaded serviceAccountKey.json into src/secrets/ and try again."
  );
  process.exit(1);
}

let serviceAccount: any;
try {
  serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
} catch (err) {
  console.error("❌ Could not parse service account JSON:", err);
  process.exit(1);
}

// Initialize admin SDK
try {
  admin.initializeApp({
    credential: admin.credential?.cert(serviceAccount),
  });
} catch (err) {
  console.error("❌ Error initializing firebase-admin:", err);
  process.exit(1);
}

const db = admin.firestore();

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

async function uploadContent(array: ContentItem[], collectionName: string) {
  for (const item of array) {
    try {
      const docRef = await db.collection(collectionName).add(item);
      console.log(`✨ Added to ${collectionName}:`, docRef.id);
    } catch (err) {
      console.error(`❌ Error writing to ${collectionName}:`, err);
    }
  }
}

(async () => {
  console.log("📤 Uploading articles...");
  await uploadContent(articles, "articles");

  console.log("📤 Uploading videos...");
  await uploadContent(videos, "videos");

  console.log("✅ Upload complete!");
  process.exit(0);
})();
