// firebase/diary.ts
import { db, auth } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

export const saveDiaryEntry = async (userId: string, entry: any) => {
  if (!userId) return;
  const entryRef = doc(db, "users", userId, "diaryEntries", entry.id);
  await setDoc(entryRef, entry);
};

export const loadDiaryEntries = async (userId: string) => {
  if (!userId) return [];
  const entriesCol = collection(db, "users", userId, "diaryEntries");
  const q = query(entriesCol, orderBy("date", "asc"));
  const snapshot = await getDocs(q);
  const entries: any[] = [];
  snapshot.forEach((doc) => entries.push(doc.data()));
  return entries;
};
