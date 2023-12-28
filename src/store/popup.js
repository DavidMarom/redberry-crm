import { create } from 'zustand';

const usePopupStore = create((set) => ({
  popId: 0,
  triggerPopup: (id) => set(() => ({ popId: id })),
}));

export default usePopupStore;
