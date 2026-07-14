import { useState } from 'react';
import type { FC } from 'react';
import styles from './Sidebar.module.css';

interface SidebarRightProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarRight: FC<SidebarRightProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const subject = encodeURIComponent('New inquiry from MAAD website');
    const body = encodeURIComponent(message);
    window.location.href = `mailto:info@maadmccann.com?subject=${subject}&body=${body}`;
    setMessage('');
  };

  return (
    <div className={`${styles.sidebar} ${styles.right} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Menu">
        &times;
      </button>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Ready to spark <br />
          <span className={styles.blackText}>something great?</span>
        </h2>
        <p className={styles.subtitle}>
          Every great idea starts with a conversation. Tell us what’s on your mind or jump straight in with one of the options below:
        </p>
        
        <form onSubmit={handleFormSubmit} className={styles.contactForm}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className={styles.messageInput}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            <span>Send Message</span>
            <span className={styles.submitArrow}>
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
          </button>
        </form>

        <div className={styles.prompts}>
          <a
            href="https://wa.me/256700000000?text=Hi%20MAAD%20McCann%20team,%20I%27d%20like%20to%20start%20a%20chat%20about%20a%20project..."
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.promptLink} ${styles.whatsapp}`}
          >
            <span>Start WhatsApp Chat</span>
            <svg viewBox="0 0 24 24" className={styles.promptIcon}>
              <path fill="currentColor" d="M12.003 21c-1.897 0-3.754-.51-5.394-1.48l-3.83 1.004 1.022-3.733c-1.07-1.747-1.636-3.76-1.636-5.834 0-6.096 4.96-11.054 11.055-11.054s11.055 4.958 11.055 11.054-4.96 11.043-11.055 11.043zm0-20.088c-4.982 0-9.032 4.048-9.032 9.03 0 2.062.702 3.97 1.872 5.5l-.657 2.402 2.464-.646c1.47.962 3.2 1.474 5.353 1.474 4.983 0 9.034-4.047 9.034-9.03S16.986.912 12.003.912zm4.73 12.443c-.26-.13-1.53-.756-1.766-.843-.238-.086-.412-.13-.585.13-.173.26-.67.84-.82.996-.153.155-.307.173-.566.043-.26-.13-1.096-.404-2.09-1.288-.772-.686-1.294-1.536-1.444-1.796-.154-.26-.017-.4.113-.53.118-.118.26-.302.39-.453.13-.15.172-.26.26-.43.085-.173.042-.325-.02-.456-.063-.13-.585-1.41-.802-1.928-.21-.51-.424-.44-.584-.448-.152-.008-.325-.008-.5-.008-.172 0-.455.065-.693.32-.238.26-.91.888-.91 2.164 0 1.275.93 2.508 1.058 2.68.13.174 1.83 2.793 4.43 3.916 2.6.113 2.6.745 3.076.7.477-.046 1.532-.627 1.748-1.233.216-.607.216-1.127.15-1.235-.065-.108-.238-.172-.497-.302z" />
            </svg>
          </a>
          <a
            href="mailto:info@maadmccann.com?subject=General%20Inquiry&body=Hi%20MAAD%20McCann%20team,%0D%0A%0D%0AI%20have%20a%20general%20inquiry%20regarding..."
            className={`${styles.promptLink} ${styles.inquiry}`}
          >
            <span>General Inquiry</span>
            <svg viewBox="0 0 24 24" className={styles.promptIcon}>
              <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <a
            href="mailto:info@maadmccann.com?subject=Request%20for%20Proposal&body=Hi%20MAAD%20McCann%20team,%0D%0A%0D%0AI%20would%20like%20to%20request%20a%20proposal%20for..."
            className={`${styles.promptLink} ${styles.rfp}`}
          >
            <span>Request for Proposal</span>
            <svg viewBox="0 0 24 24" className={styles.promptIcon}>
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8" />
              <line fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="13" x2="8" y2="13" />
              <line fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
