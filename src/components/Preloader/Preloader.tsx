import { useState, useEffect } from 'react';
import type { FC } from 'react';
import styles from './Preloader.module.css';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader: FC<PreloaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeStyle, setFadeStyle] = useState(styles.visible);

  useEffect(() => {
    if (!isLoading) {
      setFadeStyle(styles.fadeOut);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 800); // Match transition duration (800ms)
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.preloader} ${fadeStyle}`}>
      <div className={styles.content}>
        <img
          src="/assets/img/MAAD-LOGO-02.png"
          alt="MAAD McCann Logo"
          className={styles.logo}
        />
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
