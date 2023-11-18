import { create } from 'zustand';

const usePopupStore = create((set) => ({
  popId: 0,
  setId: (id) => set(() => ({ popId: id })),
}));

export default usePopupStore;
