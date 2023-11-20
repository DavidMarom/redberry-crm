"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { gprovider } from '@/services/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import useUserStore from '@/store/user';

export default function Header() {
    const img = useUserStore((state) => state.img);
    const setIsLogged = useUserStore((state) => state.setIsLogged);

    const doSignOut = () => {
        const auth = getAuth();
        signOut(auth).then((res) => {
            localStorage.removeItem('user');
            setIsLogged(false);
        }).catch((error) => { console.log(error) });
    }

    return (
        <div className="header" >
            <button onClick={doSignOut}>Logout</button>
            <img src={img} alt="Profile" width={40} height={24} />
        </div>
    )
}
