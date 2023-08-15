import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { fireStore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your api keys ",
  authDomain: "your api keys ",
  projectId: "your api keys ",
  storageBucket: "your api keys ",
  messagingSenderId: "your api keys ",
  appId: "your api keys ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
