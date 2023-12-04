"use client";
import { getAuth, signOut } from "firebase/auth";
import useUserStore from "@/store/user";
import { Container, LogoName } from "./Header.style";
import { Row } from "@/components";
import Image from "next/image";
import PopUp from "../UI/PopUp/PopUp";
import { Avatar } from "@nextui-org/react";

export default function Header() {
  const userName = useUserStore((state) => state.name);
  const img: string = useUserStore((state) => state.img);
  const setIsLogged = useUserStore((state) => state.setIsLogged);
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const isUserProfileOpened = useUserStore(
    (state) => state.isUserProfileOpened
  );

  const doSignOut = () => {
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

  const modalSettingsObject = {
    style: {
      position: "absolute",
      top: "0",
      right: "0",
      "text-align": "center",
    },
    title: (
      <div className="flex flex-col w-full gap-2 items-center">
        <p>{userName}</p>
        <Avatar src={img} className="w-20 h-20 text-large" />
      </div>
    ),
    body: (
      <button className="flex" onClick={doSignOut}>
        Logout
      </button>
    ),
    placement: "bottom",
  };

  return (
    <div className="header">
      <Container>
        <Row>
          <Image src="/lichi.svg" alt="Lichi Logo" width={44} height={44} />
          <LogoName>Redberry</LogoName>
        </Row>
      </Container>
      <Container>
        <p>{userName}</p>
        <img
          src={img}
          className="btn"
          alt="Profile pic"
          width={40}
          height={24}
          onClick={() => {
            setUserProfile(true);
          }}
        />
        {isUserProfileOpened && (
          <PopUp
            style={modalSettingsObject.style}
            title={modalSettingsObject.title}
            body={modalSettingsObject.body}
            placement={modalSettingsObject.placement}
            closePopUp={() => {
              setUserProfile(false);
            }}
          />
        )}
      </Container>
    </div>
  );
}
