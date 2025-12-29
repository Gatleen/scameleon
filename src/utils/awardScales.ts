// src/utils/awardScales.ts

import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const awardScales = async (
  userId: string,
  amount: number,
  reason: string
) => {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    scales: increment(amount),
  });

  console.log(`+${amount} scales: ${reason}`);
};
