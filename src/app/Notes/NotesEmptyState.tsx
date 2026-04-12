import React from 'react';
import { LuStickyNote } from 'react-icons/lu';
import styles from './notes.module.css';

interface NotesEmptyStateProps {
  hasSearch: boolean;
}

const NotesEmptyState = ({ hasSearch }: NotesEmptyStateProps) => (
  <div className={styles.emptyState}>
    <LuStickyNote size={48} />
    <p className={styles.emptyStateText}>
      {hasSearch ? 'No notes match your search' : 'No notes yet — add your first one!'}
    </p>
  </div>
);

export default NotesEmptyState;
