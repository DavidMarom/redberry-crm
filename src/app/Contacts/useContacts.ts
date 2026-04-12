import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getContactsByOwner, addContact, deleteContact, updateContact } from '@/services/contacts';
import { ContactType } from '@/types';

export function useContacts(uid: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery('contacts', () =>
    getContactsByOwner(uid)
  );

  const deleteMutation = useMutation((id: string) => deleteContact(id), {
    onMutate: async (id: string) => {
      await queryClient.cancelQueries('contacts');
      const previousContacts = queryClient.getQueryData('contacts');
      queryClient.setQueryData('contacts', (old: any) =>
        old.filter((item: any) => item._id !== id)
      );
      return { previousContacts };
    },
    onSuccess: () => queryClient.invalidateQueries('contacts'),
  });

  const addMutation = useMutation((contact: ContactType) => addContact(contact), {
    onMutate: async (contact: ContactType) => {
      await queryClient.cancelQueries('contacts');
      const previousContacts = queryClient.getQueryData('contacts');
      queryClient.setQueryData('contacts', (old: any) => [...old, contact]);
      return { previousContacts };
    },
    onSuccess: () => queryClient.invalidateQueries('contacts'),
  });

  const editMutation = useMutation((contact: any) => updateContact(contact), {
    onMutate: async (contact: any) => {
      await queryClient.cancelQueries('contacts');
      const previousContacts = queryClient.getQueryData('contacts');
      queryClient.setQueryData('contacts', (old: any) =>
        old.map((item: any) => (item._id === contact._id ? contact : item))
      );
      return { previousContacts };
    },
    onSuccess: () => queryClient.invalidateQueries('contacts'),
  });

  return {
    contacts: data,
    isLoading,
    isFetching,
    addContact: (contact: ContactType) => addMutation.mutate(contact),
    deleteContact: (id: string) => deleteMutation.mutate(id),
    editContact: (contact: any) => editMutation.mutate(contact),
  };
}
