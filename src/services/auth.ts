"use client"

import { gprovider } from '@/services/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import useUserStore from "@/store/user";
import { setUserProfile, setIsLogged } from "@/store/user";

interface GoogleObject {
    name: string | null;
    mail: string | null;
    photoURL: string | null;
    uid: string | null;
    token: string | null;
}

export function googleSignup(): Promise<GoogleObject | null | void> {
    const auth = getAuth();
    return signInWithPopup(auth, gprovider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken ?? null;
            const user = result.user;
            let usr = { name: user.displayName, mail: user.email, photoURL: user.photoURL, uid: user.uid, token: token };
            return usr;
        }).catch((error) => { console.log(error); return null; });
}

export function googleSignOut() {
    const auth = getAuth();

    signOut(auth)
        .then((res) => {
            localStorage.removeItem("user");
            setUserProfile(false);
            setIsLogged(false);
        })
        .catch((error) => {
            console.log(error);
        });
};
