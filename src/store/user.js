import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  logoutUser: () => set(() => ({ user: null })),

  name: "",
  setUserName: (userName) => set(() => ({ name: userName })),

  img: "",
  setImg: (str) => set(() => ({ img: str })),

  isUserProfileOpened: false,
  setUserProfile: (booleanValue) =>
    set(() => ({ isUserProfileOpened: booleanValue })),

  isLogged: false,
  setIsLogged: (bool) => set(() => ({ isLogged: bool })),
}));

export default useUserStore;
