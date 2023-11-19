import { create } from 'zustand';

const useUserStore = create((set) => ({
  img: '',
  setImg: (str) => set(() => ({ img: str })),

  isLogged: false,
  setIsLogged: (bool) => set(() => ({ isLogged: bool })),
}));

export default useUserStore;
