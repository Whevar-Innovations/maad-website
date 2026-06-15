import type { FC } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuClick: () => void;
  onContactClick: () => void;
}

const Header: FC<HeaderProps> = ({ onMenuClick, onContactClick }) => {

  return (
    <header className={styles.header}>
      <button className={styles.hamburger} onClick={onMenuClick} aria-label="Open Menu">
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      <button className={styles.contactBtn} onClick={onContactClick}>
        Contact
      </button>
    </header>
  );
};

export default Header;
