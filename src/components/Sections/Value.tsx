import { useRef } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Value.module.css';

const Value: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Section entrance
    if (container.current) {
      gsap.fromTo(container.current, 
        { yPercent: 20, opacity: 0.8 },
        {
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: true,
          },
          yPercent: 0,
          opacity: 1,
          ease: 'none'
        }
      );
    }

    if (titleRef.current && textRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }
  }, { scope: container });

  return (
    <section ref={container} className={styles.valueSection} id="about-us">
      <div className="container">
        <h2 ref={titleRef} className={styles.title}>360° VALUE</h2>
        <p ref={textRef} className={styles.description}>
          Over the years, the agency has built a reputation for culturally intelligent creative work,
          strong local insight, strategic thinking and campaigns that connect with everyday Ugandans
          while still meeting brand and business objectives.
        </p>
        <div className={styles.action}>
          <button className={styles.caseStudyBtn}>View case studies</button>
        </div>
      </div>
    </section>
  );
};

export default Value;
