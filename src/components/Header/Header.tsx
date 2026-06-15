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

      <div className={styles.logo}>
        <img src="/assets/img/MAAD-LOGO-02.png" alt="MAAD McCann Logo" />
      </div>

      <div className={styles.rightSide}>
        <button className={styles.shortcut} onClick={onContactClick}>
          Press C for ?
        </button>
      </div>
    </header>
  );
};

export default Header;
