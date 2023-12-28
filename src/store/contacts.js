import { create } from "zustand";

const useContactsStore = create((set) => ({
  contacts: [],
  setContacts: () => set((state) => ({ contacts: state })),

  // activeContact: {},
  // setActiveContact: (contact) => set({ activeContact: contact }),

  contactToEdit: {},
  setContactToEdit: (contact) => set({ contactToEdit: contact }),

}));

// I need to export this for the contacts service
export const { setContacts } = useContactsStore.getState();

export default useContactsStore;
