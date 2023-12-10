// 'use client';
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { a, b, c, d } from './a';

const firebaseConfig = {
    // apiKey: a('AIzaSyDm_l9QnEC6N1L6ca9EfUtUFgD89fEjuO'),
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    // authDomain: b('redberry-4dc8', '.firebaseapp.com'),
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

    // projectId: c('redberry-4dc8'),
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

    // storageBucket: b('redberry-4dc8', '.appspot.com'),
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

    // messagingSenderId: d('86807849838'),
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

    // appId: b('1:868078498382:web:2', '501781081aa66a45091f')
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const gprovider = new GoogleAuthProvider();
export const db = getFirestore(app);