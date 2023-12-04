"use client";
import { getAuth, signOut } from "firebase/auth";
import useUserStore from "@/store/user";
import { Container, LogoName } from "./Header.style";
import { Row } from "@/components";
import Image from "next/image";
import PopUp from "../UI/PopUp/PopUp";

export default function Header() {
  const userName = useUserStore((state) => state.name);
  const img: string = useUserStore((state) => state.img);
  const setIsLogged = useUserStore((state) => state.setIsLogged);
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const isUserProfileOpened = useUserStore(
    (state) => state.isUserProfileOpened
  );

  const modalSettingsObject = {
    style: {
      position: "absolute",
      top: "0",
      right: "0",
    },
    title: "title",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto earum quidem maxime dolorum explicabo dolore corporis laborum voluptatum repellat autem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto earum quidem maxime dolorum explicabo dolore corporis laborum voluptatum repellat autem?",
    footer: "fgfgfgfggfgfg",
    placement: "bottom",
  };

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
        <button onClick={doSignOut}>Logout</button>
        {isUserProfileOpened && (
          <PopUp
            style={modalSettingsObject.style}
            title={modalSettingsObject.title}
            body={modalSettingsObject.body}
            footer={modalSettingsObject.footer}
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
