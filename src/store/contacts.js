import { create } from "zustand";

const useContactsStore = create((set) => ({
  contacts: [],
  setContacts: () => set((state) => ({ contacts: state })),
}));

// I need to export this for the contacts service
export const { contacts } = useContactsStore.getState();
export const { setContacts } = useContactsStore.getState();

export default useContactsStore;
