"use client"

import { gprovider } from '@/services/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { GoogleObject } from "@/types";
import { clearUser } from "@/utils/userUtils";
import { setJwt } from "@/store/user.js";

export function googleSignup(): Promise<GoogleObject | null | void> {
    return signInWithPopup(getAuth(), gprovider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            
            setJwt(credential?.accessToken ?? null);
            
            const user = result.user;
            let usr = { name: user.displayName, mail: user.email, photoURL: user.photoURL, uid: user.uid };
            return usr;
        }).catch((error) => { console.log(error); return null; });
}

export async function googleSignOut() {
    try {
        await signOut(getAuth())
        clearUser();
    } catch (error) {
        console.log(error);
    }
};
