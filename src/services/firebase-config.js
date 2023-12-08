// 'use client';
import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.PUBLIC_API_KEY,
    authDomain: process.env.PUBLIC_AUTH_DOMAIN,
    projectId: process.env.PUBLIC_PROJECT_ID,
    storageBucket: process.env.PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const gprovider = new GoogleAuthProvider();
// export const db = getFirestore(app);