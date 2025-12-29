import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getCyberHygiene = async (uid: string) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data().cyberHygiene || null;
};

export const saveCyberHygieneItem = async (uid: string, itemId: number) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    [`cyberHygiene.checkedItems.${itemId}`]: true,
    "cyberHygiene.completedAt": serverTimestamp(),
  });
};
