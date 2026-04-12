import React, { useState } from 'react';
import Image from 'next/image';
import styles from './notes.module.css';

interface NoteCardProps {
  text: string;
  color: string;
  onDelete: () => void;
  isDeleting: boolean;
}

const NoteCard = ({ text, color, onDelete, isDeleting }: NoteCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`grid-item ${styles.noteCard}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: color,
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.12)' : undefined,
      }}
    >
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className={styles.deleteBtn}
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <Image src="/icons/trash.svg" alt="Delete" width={16} height={16} />
      </button>
      <p className={styles.noteText}>{text}</p>
    </div>
  );
};

export default NoteCard;
