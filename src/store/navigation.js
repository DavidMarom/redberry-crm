import { create } from "zustand";

const useNavigationStore = create((set) => ({
  isContactsLoading: false,
  setContactLoading: () => set(() => ({ isContactsLoading: true })),
  unsetContactLoading: () => set(() => ({ isContactsLoading: false })),
}));

// I need to export this for the contacts service
export const { setContactLoading } = useNavigationStore.getState();
export const { unsetContactLoading } = useNavigationStore.getState();

export default useNavigationStore;
