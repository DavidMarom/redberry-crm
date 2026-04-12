import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotesByOwner, addNote, deleteNote } from '@/services/notes';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export function useNotes(uid: string | null) {
  const queryClient = useQueryClient();
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [prioritizedIds, setPrioritizedIds] = useState<string[] | null>(null);
  const [isPrioritizing, setIsPrioritizing] = useState(false);

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

  const baseNotes = prioritizedIds
    ? [...(data ?? [])].sort((a, b) => {
      const ai = prioritizedIds.indexOf(a._id);
      const bi = prioritizedIds.indexOf(b._id);
      return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
    })
    : (data ?? []);

  const filteredNotes = baseNotes.filter((note: any) =>
    note.text?.toLowerCase().includes(search.toLowerCase())
  );

  const prioritize = async () => {
    if (!data || data.length < 2) return;
    setIsPrioritizing(true);
    try {
      const noteList = data.map((n: any) => `ID: ${n._id}\nText: ${n.text}`).join('\n\n');
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a productivity assistant. Reorder the given notes from most to least urgent/important based on their content. Respond with ONLY a JSON array of IDs in priority order, no explanation.',
          },
          {
            role: 'user',
            content: noteList,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const parsed = JSON.parse(response.choices[0].message.content ?? '{}');
      const ids: string[] = parsed.ids ?? parsed.order ?? Object.values(parsed)[0];
      if (Array.isArray(ids)) setPrioritizedIds(ids);
    } finally {
      setIsPrioritizing(false);
    }
  };

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
    prioritize,
    isPrioritizing,
    isPrioritized: !!prioritizedIds,
    resetPriority: () => setPrioritizedIds(null),
  };
}
