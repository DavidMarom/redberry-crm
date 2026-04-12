import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { MAX_CHARS } from './constants';
import styles from './notes.module.css';

interface AddNoteCardProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const AddNoteCard = ({ value, onChange, onSubmit, isSubmitting }: AddNoteCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') onSubmit();
  };

  const isNearLimit = value.length > MAX_CHARS * 0.9;
  const isDisabled = !value.trim() || isSubmitting;

  return (
    <div className={`grid-item ${styles.addCard}`}>
      <p className={styles.addCardLabel}>New note</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write something…"
        maxLength={MAX_CHARS}
        className={styles.addCardTextarea}
      />
      <div className={styles.addCardFooter}>
        <span className={`${styles.charCount} ${isNearLimit ? styles.charCountWarn : ''}`}>
          {value.length}/{MAX_CHARS}
        </span>
        <button
          onClick={onSubmit}
          disabled={isDisabled}
          title="Add note (⌘+Enter)"
          className={`${styles.submitBtn} ${isDisabled ? styles.submitBtnDisabled : ''}`}
        >
          <LuArrowRight className={styles.arrowIcon} />
        </button>
      </div>
      <p className={styles.addCardHint}>⌘+Enter to add</p>
    </div>
  );
};

export default AddNoteCard;
