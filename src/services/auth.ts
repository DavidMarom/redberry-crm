"use client"

import { gprovider } from '@/services/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { GoogleObject } from "@/types";
import { clearUser } from "@/utils/userUtils";
import { setStore } from '@/store/user';

export function googleSignup(): Promise<GoogleObject | null | void> {
    return signInWithPopup(getAuth(), gprovider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            
            const token = credential?.idToken;
            // put token in zustand
            setStore(() => ({ jwt: token }));
            
            const user = result.user;
            let usr = { name: user.displayName, mail: user.email, photoURL: user.photoURL, uid: user.uid };
            return usr;
        }).catch((error) => { console.log(error); return null; });
}

export async function googleSignOut() {
    try {
        await signOut(getAuth())
        clearUser();
        setStore(() => ({ jwt: null }));
    } catch (error) {
        console.log(error);
    }
};
