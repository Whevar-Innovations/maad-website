import type { FC } from 'react';
import styles from './Sidebar.module.css';

interface SidebarRightProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarRight: FC<SidebarRightProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${styles.right} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Menu">
        &times;
      </button>
      <div className={styles.content}>
        <h2 className={styles.title}>READY TO SPARK SOMETHING GREAT?</h2>
        <p className={styles.subtitle}>
          Every great idea starts with a conversation. Tell us what’s on your mind or jump straight in with one of the options below:
        </p>
        
        <div className={styles.typingBox}>
          <span>Type here</span>
        </div>

        <div className={styles.prompts}>
          <button className={styles.promptBtn}>Start Whatsapp chat</button>
          <button className={styles.promptBtn}>General Inquiry</button>
          <button className={styles.promptBtn}>Request for proposal</button>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
