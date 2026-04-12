import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const requiredFirebaseVars = {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missingFirebaseVars = Object.entries(requiredFirebaseVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

if (missingFirebaseVars.length > 0) {
    console.error(`Missing required Firebase environment variables: ${missingFirebaseVars.join(', ')}`);
}

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = missingFirebaseVars.length === 0 ? initializeApp(firebaseConfig) : null;
export const gprovider = new GoogleAuthProvider();
export const db = app ? getFirestore(app) : null;