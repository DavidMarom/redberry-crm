import { create } from "zustand";

const useContactsStore = create((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts: contacts }),

  contactToEdit: {},
  setContactToEdit: (contact) => set({ contactToEdit: contact }),

}));

// I need to export this for the contacts service
export const { setContacts } = useContactsStore.getState();

export default useContactsStore;
