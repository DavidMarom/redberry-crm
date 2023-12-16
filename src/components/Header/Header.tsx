"use client";
import { getAuth, signOut } from "firebase/auth";
import useUserStore from "@/store/user";
import { Avatar, Button, Card, CardHeader, Divider, Image, Navbar, NavbarBrand, NavbarContent, Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import { googleSignup } from "@/services/auth";
import http from "@/services/http";
import { sendWelcomeEmail } from '@/services/mailchimp';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function Header() {
  const userName = useUserStore((state) => state.name);
  const img: string = useUserStore((state) => state.img);
  const setIsLogged = useUserStore((state) => state.setIsLogged);
  const setUserName = useUserStore((state) => state.setUserName);
  const email = useUserStore((state) => state.email);

  const setEmail = useUserStore((state) => state.setEmail);

  const setImg = useUserStore((state) => state.setImg);
  const isLogged = useUserStore((state) => state.isLogged);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const signupHandler = () => {
    const googleRes = googleSignup();
    googleRes.then((res) => {
      if (res) {
        // Save the google user info to local storage
        localStorage.setItem("user", JSON.stringify(res));
        setUserName(res.name ?? "");
        setImg(res.photoURL ?? "");
        setEmail(res.mail ?? "");
        setIsLogged(true);
        // Check if DB has the user
        http.get(`users/${res.uid}`).then((response: any) => {
          if (!response.data) {
            // If not, add the user to DB and send welcome email
            http.post('users', res)
              .then((response: any) => { console.log(response) })
              .catch((error: any) => { console.log(error) })
            sendWelcomeEmail(res.mail, res.name)
          }
        })
        setIsLogged(true);
      }
    });
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
    <Navbar position="sticky" maxWidth="full" >
      <NavbarBrand >
        <Image
          src="/lichi.svg"
          alt="Lichi Logo"
          width={44}
          height={44}
        />
        <span className="text-danger-500 text-xl">Redberry</span>

      </NavbarBrand>

      <NavbarContent justify="end">

        {isLogged ?

          <Popover className="mr-6 w-96">
            <PopoverTrigger>
              <Avatar
                name={userName}
                src={img}
              />
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-3 text-foreground">
                <div className="flex flex-col gap-3 items-center text-center">
                  <Image
                    alt={userName + " Profile Logo"}
                    height={40}
                    radius="sm"
                    src={img}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{userName}</p>
                    <p className="text-small text-default-500">{JSON.parse(localStorage.getItem("user") ?? "").mail}</p>
                  </div>
                </div>

                <Divider className="my-4" />
                <div className="flex flex-row w-full justify-center items-center gap-4">

                  <Button color="primary" variant="light" onClick={doSignOut}>
                    Logout
                  </Button>

                </div>
              </div>
            </PopoverContent>
          </Popover>
          :
          <div className="margin-right-20">
            <Button color="danger" variant="bordered" onClick={signupHandler}>Login</Button>
          </div>

        }
      </NavbarContent>
    </Navbar>
  );
}