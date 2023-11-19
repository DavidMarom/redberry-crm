import { create } from 'zustand';

const useUserStore = create((set) => ({
  img: '',
  setImg: (str) => set(() => ({ img: str })),
}));

export default useUserStore;
