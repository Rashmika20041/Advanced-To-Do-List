import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore,Firestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvsEG9P_1E7EP5CcXeKJBS-OnrNnxDLPw",
  authDomain: "to-do-list-a9017.firebaseapp.com",
  databaseURL: "https://to-do-list-a9017-default-rtdb.firebaseio.com",
  projectId: "to-do-list-a9017",
  storageBucket: "to-do-list-a9017.appspot.com",
  messagingSenderId: "285440171695",
  appId: "1:285440171695:web:107bfd54a984ff68ea7e5a",
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

console.log("Firebase initialized", db);