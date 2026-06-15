import type { FC } from 'react';
import styles from './Sidebar.module.css';

interface SidebarLeftProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarLeft: FC<SidebarLeftProps> = ({ isOpen, onClose }) => {
  const links = ['About Us', 'Our Work', 'Team/Leadership', 'Insights', 'Careers'];

  return (
    <div className={`${styles.sidebar} ${styles.left} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Menu">
        &times;
      </button>
      <div className={styles.content}>
        <nav className={styles.nav}>
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace('/', '-')}`} className={styles.navLink} onClick={onClose}>
              {link}
            </a>
          ))}
        </nav>
        <div className={styles.description}>
          <p>
            MAAD McCANN Uganda is a full-service creative, media and advertising agency based in Kampala.
            We help brands solve business problems through strategy, creativity, media, digital, content,
            PR, production, activations and culturally relevant brand experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
