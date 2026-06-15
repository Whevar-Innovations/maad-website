import { useRef } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Showreel.module.css';

const Showreel: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && videoWrapperRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        videoWrapperRef.current,
        { scale: 0.5 },
        { scale: 0.8, ease: 'none', duration: 1 }
      ).to(
        videoWrapperRef.current,
        { scale: 0.5, ease: 'none', duration: 1 }
      );

      // Exit animation for the whole section
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: '+=100%',
          scrub: true,
        },
        scale: 0.9,
        opacity: 0.8,
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.showreel}>
      <div ref={videoWrapperRef} className={styles.videoWrapper}>
        <video
          className={styles.video}
          src="/assets/showreel/MAAD SHOWREEL.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
};

export default Showreel;
