import { create } from "zustand";

const useUserStore = create((set) => ({
  storeUser: null,
  setStoreUser: (storeUser) => set(() => ({ storeUser: storeUser })),
  logoutUser: () => set(() => ({ user: null })),

  isUserProfileOpened: false,
  setUserProfile: (booleanValue) =>
    set(() => ({ isUserProfileOpened: booleanValue })),

  isLogged: false,
  setIsLogged: (bool) => set(() => ({ isLogged: bool })),
}));

// I need to export these in order to use them in /services/auth.js
export const { setUserProfile } = useUserStore.getState();
export const { setIsLogged } = useUserStore.getState();
export const { setStoreUser } = useUserStore.getState();

export default useUserStore;
