"use client";

import React from "react";
import { getAuth, signOut } from "firebase/auth";
import useUserStore from "@/store/user";
import { Container, LogoName } from "./Header.style";
import Image from "next/image";

export default function Header() {
  const userName = useUserStore((state) => state.name);
  const img: string = useUserStore((state) => state.img);
  const setIsLogged = useUserStore((state) => state.setIsLogged);

  const doSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then((res) => {
        localStorage.removeItem("user");
        setIsLogged(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <Container>
        <Image src="/lichi.svg" alt="Lichi Logo" width={44} height={44} />
        <LogoName>Redberry</LogoName>
      </Container>
      <Container>
        <p>{userName}</p>
        <img src={img} alt="Profile pic" width={40} height={24} />{" "}
        <button onClick={doSignOut}>Logout</button>
      </Container>
    </div>
  );
}
