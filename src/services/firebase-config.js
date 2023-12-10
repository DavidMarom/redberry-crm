// 'use client';
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { a, b, c, d } from './a';

const firebaseConfig = {
    // apiKey: a('AIzaSyDm_l9QnEC6N1L6ca9EfUtUFgD89fEjuO'),
    apiKey: process.env.PUBLIC_REACT_APP_API_KEY,

    // authDomain: b('redberry-4dc8', '.firebaseapp.com'),
    authDomain: process.env.PUBLIC_REACT_APP_AUTH_DOMAIN,

    // projectId: c('redberry-4dc8'),
    projectId: process.env.PUBLIC_REACT_APP_PROJECT_ID,

    // storageBucket: b('redberry-4dc8', '.appspot.com'),
    storageBucket: process.env.PUBLIC_REACT_APP_STORAGE_BUCKET,

    // messagingSenderId: d('86807849838'),
    messagingSenderId: process.env.PUBLIC_REACT_APP_MESSAGING_SENDER_ID,

    // appId: b('1:868078498382:web:2', '501781081aa66a45091f')
    appId: process.env.PUBLIC_MANDRIL,
    // appId: process.env.PUBLIC_REACT_APP_APP_ID,
};

console.log('--------', firebaseConfig)
console.log('--------', process.env.PUBLIC_MANDRIL)
console.log('--------', process.env.PUBLIC_REACT_APP_STORAGE_BUCKET)

const app = initializeApp(firebaseConfig);
export const gprovider = new GoogleAuthProvider();
export const db = getFirestore(app);