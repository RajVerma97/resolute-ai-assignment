import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyABL9FD1zw9LpLTsrlgyincEhTcqhOllK4",
  authDomain: "resolute-ai-assignment-c6ad0.firebaseapp.com",
  projectId: "resolute-ai-assignment-c6ad0",
  storageBucket: "resolute-ai-assignment-c6ad0.appspot.com",
  messagingSenderId: "1022094804252",
  appId: "1:1022094804252:web:fc28b19289cdfb02ac26d9",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
