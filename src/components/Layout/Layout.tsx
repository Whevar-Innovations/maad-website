import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import Header from '../Header/Header';
import SidebarLeft from '../Sidebar/SidebarLeft';
import SidebarRight from '../Sidebar/SidebarRight';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  useSmoothScroll();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);

  return (
    <div className={styles.layout}>
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
