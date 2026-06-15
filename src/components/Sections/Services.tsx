import { useRef } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Services.module.css';

const Services: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const services = [
    'Strategy & Brand Thinking',
    'Creative Development',
    'Digital & Social',
    'Media Planning & Buying',
    'Content Production',
    'PR & Influence',
    'OOH / Print / Radio / TV',
    'Experiential & Activations',
  ];

  useGSAP(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }

    if (listRef.current) {
      const items = listRef.current.children;
      gsap.fromTo(
        items,
        { opacity: 0, x: -50 },
        {
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, { scope: container });

  return (
    <section ref={container} className={styles.servicesSection} id="our-work">
      <div className="container">
        <h2 ref={titleRef} className={styles.title}>WHAT WE DO</h2>
        <div ref={listRef} className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceItem}>
              <span className={styles.bullet}>—</span>
              <span className={styles.serviceName}>{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
