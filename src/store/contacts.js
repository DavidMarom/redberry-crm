import { create } from "zustand";

const useContactsStore = create((set) => ({
  contactToEdit: {},
  setContactToEdit: (contact) => set({ contactToEdit: contact }),
}));

export default useContactsStore;
