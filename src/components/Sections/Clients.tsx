import { useRef } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Clients.module.css';

gsap.registerPlugin(ScrollTrigger);

const clientLogos = Array.from(
  { length: 14 },
  (_, i) => `/assets/img/clients/${i + 1}.png`,
);

const Clients: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const content = contentRef.current;
    if (!content) return;

    // Content entrance animation
    gsap.fromTo(
      content.children,
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: content,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      },
    );
  }, { scope: sectionRef });

  // Triple the items to ensure seamless infinite looping scroll
  const marqueeItems = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section ref={sectionRef} className={styles.clientsSection} id="partners">
      <div ref={contentRef} className={styles.container}>
        <span className={styles.label}>TRUSTED PARTNERSHIPS</span>
        <h2 className={styles.headline}>
          Working with brands that put people first.
        </h2>
        
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {marqueeItems.map((logoUrl, index) => (
              <div key={index} className={styles.marqueeItem}>
                <img
                  src={logoUrl}
                  alt={`Client Logo ${(index % 14) + 1}`}
                  className={styles.clientLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
