"use client";

import { LuSearch } from 'react-icons/lu';
import { Loader } from '@/components';
import { useNotes } from './useNotes';
import { NOTE_COLORS } from './constants';
import NoteCard from './NoteCard';
import AddNoteCard from './AddNoteCard';
import NotesEmptyState from './NotesEmptyState';
import styles from './notes.module.css';

const NotesPage = () => {
  const user = localStorage.getItem('user');
  const uid = user ? JSON.parse(user).uid : null;

  const {
    notes,
    filteredNotes,
    isLoading,
    isFetching,
    input,
    setInput,
    search,
    setSearch,
    submitNote,
    isSubmitting,
    deleteNote,
    isDeleting,
  } = useNotes(uid);

  return (
    <div className={`full-width ${styles.page}`}>
      {(isFetching || isLoading) && <Loader />}

      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Notes</h1>
          {notes && <span className={styles.badge}>{notes.length}</span>}
        </div>

        <div className={styles.searchBar}>
          <LuSearch style={{ color: '#888', flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notes…"
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className="notes-grid-container">
        <AddNoteCard
          value={input}
          onChange={setInput}
          onSubmit={submitNote}
          isSubmitting={isSubmitting}
        />
        {filteredNotes.map((note: any, idx: number) => (
          <NoteCard
            key={note._id ?? idx}
            text={note.text}
            color={NOTE_COLORS[idx % NOTE_COLORS.length]}
            onDelete={() => deleteNote(note._id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>

      {!isLoading && notes && filteredNotes.length === 0 && (
        <NotesEmptyState hasSearch={!!search} />
      )}
    </div>
  );
};

export default NotesPage;
