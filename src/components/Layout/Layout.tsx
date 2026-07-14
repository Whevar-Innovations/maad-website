import { useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import Header from '../Header/Header';
import SidebarLeft from '../Sidebar/SidebarLeft';
import SidebarRight from '../Sidebar/SidebarRight';
import Preloader from '../Preloader/Preloader';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  useSmoothScroll();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let windowLoaded = false;
    let videoReady = false;

    const checkComplete = () => {
      if (windowLoaded && videoReady) {
        setIsLoading(false);
      }
    };

    // 1. Check window load event
    if (document.readyState === 'complete') {
      windowLoaded = true;
    } else {
      const handleWindowLoad = () => {
        windowLoaded = true;
        checkComplete();
      };
      window.addEventListener('load', handleWindowLoad);
    }

    // 2. Check if hero video ready
    const videoEl = document.getElementById('hero-video') as HTMLVideoElement | null;
    if (videoEl && videoEl.readyState >= 3) {
      videoReady = true;
    } else {
      const handleVideoReady = () => {
        videoReady = true;
        checkComplete();
      };
      window.addEventListener('hero-video-ready', handleVideoReady);

      // Fallback timeout of 3.5 seconds to guarantee loader fades out even if network stalls
      const fallbackTimeout = setTimeout(() => {
        videoReady = true;
        checkComplete();
      }, 3500);

      return () => {
        window.removeEventListener('hero-video-ready', handleVideoReady);
        window.removeEventListener('load', () => {});
        clearTimeout(fallbackTimeout);
      };
    }

    checkComplete();
  }, []);

  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);

  return (
    <div className={styles.layout}>
      <Preloader isLoading={isLoading} />
      
      <Header onMenuClick={toggleLeftSidebar} onContactClick={toggleRightSidebar} />
      
      <SidebarLeft isOpen={leftSidebarOpen} onClose={() => setLeftSidebarOpen(false)} />
      <SidebarRight isOpen={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />

      <main className={`${styles.mainContent} ${leftSidebarOpen || rightSidebarOpen ? styles.shifted : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
