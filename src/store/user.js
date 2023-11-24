import { create } from "zustand";

const useUserStore = create((set) => ({
  name: "",
  setUserName: (userName) => set(() => ({ name: userName })),

  img: "",
  setImg: (str) => set(() => ({ img: str })),

  isLogged: false,
  setIsLogged: (bool) => set(() => ({ isLogged: bool })),
}));

export default useUserStore;
