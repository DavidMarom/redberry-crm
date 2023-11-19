// 'use client';
import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { a, b, c, d } from './a';

const firebaseConfig = {
    apiKey: a('AIzaSyDm_l9QnEC6N1L6ca9EfUtUFgD89fEjuO'),
    authDomain: b('redberry-4dc8', '.firebaseapp.com'),
    projectId: c('redberry-4dc8'),
    storageBucket: b('redberry-4dc8', '.appspot.com'),
    messagingSenderId: d('86807849838'),
    appId: b('1:868078498382:web:2', '501781081aa66a45091f')
};

const app = initializeApp(firebaseConfig);
export const gprovider = new GoogleAuthProvider();
// export const db = getFirestore(app);