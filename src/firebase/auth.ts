import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "./firebaseConfig";

export const registerNewUser = async (
  fullname: string,
  username: string,
  emailAddress: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    emailAddress,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    fullname,
    username,
    emailAddress,
    uid: user.uid,
    scales: 0,
    lastDailyQuizDate: null,

    createdAt: new Date().toISOString(),
  });

  return user;
};

export const signInUser = async (emailAddress: string, password: string) => {
  return signInWithEmailAndPassword(auth, emailAddress, password);
};

export const getUserProfile = async (user: any) => {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const newProfile = {
      username: user.displayName || "friend",
      emailAddress: user.email,
      uid: user.uid,
      scales: 0,
      lastDailyQuizDate: null,

      createdAt: new Date().toISOString(),
    };

    await setDoc(userRef, newProfile);
    return newProfile;
  }

  const data = snapshot.data();

  if (data.scales === undefined) {
    await setDoc(
      userRef,
      {
        scales: 0,
        lastDailyQuizDate: null,
      },
      { merge: true }
    );

    return {
      ...data,
      scales: 0,
      lastDailyQuizDate: null,
    };
  }

  return data;
};
