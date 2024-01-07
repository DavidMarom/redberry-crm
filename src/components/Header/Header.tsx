"use client";

import React from "react";
import useUserStore from "@/store/user";
import { Avatar, Button, Divider, Image, Navbar, NavbarBrand, NavbarContent, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { googleSignOut } from "@/services/auth";
import { signupHandler } from "@/utils/userUtils";

export default function Header() {
  const storeUser = useUserStore((state) => state.storeUser);
  const isLogged = useUserStore((state) => state.isLogged);

  return (
    <Navbar position="sticky" maxWidth="full" className="drop" >
      <NavbarBrand >
        <Image src="icons/lichi.svg" alt="Lichi Logo" width={44} height={44} />
        <span className="text-danger-500 text-xl">Redberry</span>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isLogged ?
          <Popover className="mr-6 w-96">
            <PopoverTrigger><Avatar name={storeUser.name} src={storeUser.photoURL} /></PopoverTrigger>
            <PopoverContent>
              <div className="p-3 text-foreground">
                <div className="flex flex-col gap-3 items-center text-center">
                  <Image alt={storeUser.name + " Profile Logo"} height={40} radius="sm" src={storeUser.photoURL} width={40} />
                  <div className="flex flex-col">
                    <p className="text-md">{storeUser.name}</p>
                    <p className="text-small text-default-500">{storeUser.mail}</p>
                  </div>
                </div>
                <Divider className="my-4" />
                <div className="flex flex-row w-full justify-center items-center gap-4">
                  <Button color="primary" variant="light" onClick={googleSignOut}>Logout</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          :
          <div className="margin-right-20">
            <Button color="primary" variant="light" onClick={signupHandler}>Login →</Button>
          </div>
        }
      </NavbarContent>
    </Navbar>
  );
}