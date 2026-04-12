import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotesByOwner, addNote, deleteNote } from '@/services/notes';

export function useNotes(uid: string | null) {
  const queryClient = useQueryClient();
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading, isFetching } = useQuery(
    'notes',
    () => getNotesByOwner(uid!),
    { enabled: !!uid },
  );

  const deleteMutation = useMutation((id: string) => deleteNote(id), {
    onMutate: async (id: string) => {
      await queryClient.cancelQueries('notes');
      const previousNotes = queryClient.getQueryData('notes');
      queryClient.setQueryData('notes', (old: any) =>
        old.filter((item: any) => item._id !== id)
      );
      return { previousNotes };
    },
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });

  const addMutation = useMutation((note: any) => addNote(note), {
    onMutate: async (note: any) => {
      await queryClient.cancelQueries('notes');
      const previousNotes = queryClient.getQueryData('notes');
      queryClient.setQueryData('notes', (old: any) => [...old, note]);
      return { previousNotes };
    },
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
      setInput('');
    },
  });

  const submitNote = () => {
    if (!input.trim()) return;
    addMutation.mutate({ text: input, owner: uid });
  };

  const filteredNotes = (data ?? []).filter((note: any) =>
    note.text?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    notes: data,
    filteredNotes,
    isLoading,
    isFetching,
    input,
    setInput,
    search,
    setSearch,
    submitNote,
    isSubmitting: addMutation.isLoading,
    deleteNote: (id: string) => deleteMutation.mutate(id),
    isDeleting: deleteMutation.isLoading,
  };
}
