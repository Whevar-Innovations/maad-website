import type { FC } from 'react';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.bgLogo}>
        {/* Large stylized logo could go here as an SVG or image */}
        <div className={styles.logoText}>MAAD MCCANN</div>
      </div>
      
      <div className="container">
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} MAADMCCANN. All Rights Reserved.
          </p>
          
          <nav className={styles.legalLinks}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms and Conditions</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
