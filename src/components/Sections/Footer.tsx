import type { FC } from 'react';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.bgLogo}></div>
      
      <div className="container">
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>HAVE AN IDEA WORTH<br />MAKING?</h2>
          <a href="mailto:info@maadmccann.com" className={styles.ctaButton}>
            LET'S WORK TOGETHER
          </a>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} MAADMCCANN. All Rights Reserved.
          </p>
          
          <div className={styles.socials}>
            <a href="#tiktok" aria-label="TikTok">TikTok</a>
            <a href="#facebook" aria-label="Facebook">Facebook</a>
            <a href="#instagram" aria-label="Instagram">Instagram</a>
            <a href="#x" aria-label="X">X</a>
            <a href="#linkedin" aria-label="LinkedIn">LinkedIn</a>
          </div>
          
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
