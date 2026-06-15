import { useRef } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '/assets/img/MAAD-LOGO-02.png';
import styles from './Hero.module.css';

const Hero: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5, 
          ease: 'power4.out',
          delay: 0.5 
        }
      );

      gsap.to(logoRef.current, {
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top 20%',
          end: 'bottom top',
          scrub: true,
        },
        y: -100,
        opacity: 0,
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className={styles.hero}>
      <div className={styles.logoWrapper}>
        <img ref={logoRef} src={logo} alt="MAAD McCann Logo" className={styles.logo} />
      </div>
    </section>
  );
};


export default Hero;
