import { create } from "zustand";

const useContactsStore = create((set) => ({
  // TODO: remove this after QA
  // contacts: [],
  // setContacts: (contacts) => set({ contacts: contacts }),
  
  contactToEdit: {},
  setContactToEdit: (contact) => set({ contactToEdit: contact }),
  
  }));
  
  // I need to export this for the contacts service
  // TODO: remove this after QA
// export const { setContacts } = useContactsStore.getState();

export default useContactsStore;
