import type { FC } from 'react';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Giant Outline Watermark */}
      <div className={styles.giantWord}>MAAD</div>
      
      <div className="container">
        <div className={styles.ctaContainer}>
          <span className={styles.tagline}>[ Let&apos;s Connect ]</span>
          <h2 className={styles.ctaTitle}>
            Ready to move <span className={styles.highlightRed}>people?</span>
            <br />
            Let&apos;s create stories <span className={styles.outlineText}>that matter.</span>
          </h2>
          <a href="mailto:info@maadmccann.com" className={styles.ctaButton}>
            <span>Start a conversation</span>
            <span className={styles.arrowCircle}>
              <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
          </a>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.infoCol}>
            <p className={styles.location}>Kampala, Uganda</p>
            <p className={styles.copyright}>
              © {currentYear} MAAD McCann. All Rights Reserved.
            </p>
          </div>
          
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
