import { useRef } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';

const Hero: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const isDesktop = window.innerWidth > 1024;
    const wrapper = headlineWrapperRef.current;
    
    // Calculate initial center offset for Phase 1
    if (isDesktop && wrapper) {
      const width = wrapper.offsetWidth;
      // resting left is 60px. Center of wrapper resting left is 60 + width/2.
      // center of screen is window.innerWidth / 2.
      const xOffset = window.innerWidth / 2 - (60 + width / 2);
      gsap.set(wrapper, { x: xOffset });
    }

    // Phase 1: Entrance Timeline (Page Load)
    const entranceTl = gsap.timeline();

    // Stagger character typing reveals word-by-word
    const animateWord = (wordId: string, delay: number = 0) => {
      return gsap.to(`[data-word="${wordId}"] .${styles.char}`, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        delay,
      });
    };

    entranceTl.add(animateWord('ideas'));
    entranceTl.add(animateWord('that'), '+=0.25');
    entranceTl.add(animateWord('move'), '+=0.25');
    entranceTl.add(animateWord('people'), '+=0.25');

    if (isDesktop) {
      // Completed headline remains centered for 500ms, then pushes to left as video expands
      entranceTl.to(
        headlineWrapperRef.current,
        {
          x: 0,
          duration: 1.6,
          ease: 'power4.inOut',
        },
        '+=0.5'
      );

      entranceTl.to(
        videoWrapperRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.6,
          ease: 'power4.inOut',
        },
        '<' // Simultaneous
      );
    } else {
      // Mobile: Simple video fade-reveal
      entranceTl.fromTo(
        videoWrapperRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '+=0.3'
      );
    }

    // Phase 2: Scroll-Driven Pinned Zoom (Desktop only)
    if (isDesktop && container.current && videoWrapperRef.current && headlineWrapperRef.current && videoRef.current) {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=100%', // Scroll a viewport height
          pin: true,     // Pin the hero section
          scrub: true,   // Scrub transitions
        },
      });

      // Video wrapper expands to fill screen, rounded corners disappear
      scrollTl.to(
        videoWrapperRef.current,
        {
          width: '100vw',
          height: '100vh',
          right: '0px',
          top: '0px',
          transform: 'translate(0px, 0px)',
          borderRadius: '0px',
          duration: 1,
          ease: 'none',
        },
        0
      );

      // Camera push-in effect on video content
      scrollTl.to(
        videoRef.current,
        {
          scale: 1.25,
          duration: 1,
          ease: 'none',
        },
        0
      );

      // Text scales down, fades out, and moves diagonally to bottom-left corner
      scrollTl.to(
        headlineWrapperRef.current,
        {
          x: '-10vw',
          y: '25vh',
          scale: 0.45,
          opacity: 0,
          duration: 1,
          ease: 'power2.in',
        },
        0
      );
    }
  }, { scope: container });

  const words = [
    { id: 'ideas', text: 'IDEAS', isRed: false },
    { id: 'that', text: 'THAT', isRed: false },
    { id: 'move', text: 'MOVE', isRed: true },
    { id: 'people', text: 'PEOPLE', isRed: false },
  ];

  return (
    <section ref={container} className={styles.hero}>
      <div className={styles.heroContent}>
        <div ref={headlineWrapperRef} className={styles.headlineWrapper}>
          <h1 ref={headlineRef} className={styles.headline}>
            {words.map((word, wIdx) => (
              <span
                key={word.id}
                className={`${styles.word} ${word.isRed ? styles.italicRed : ''}`}
                data-word={word.id}
              >
                {word.text.split('').map((char, cIdx) => (
                  <span key={cIdx} className={styles.char}>
                    {char}
                  </span>
                ))}
                {wIdx < words.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h1>
        </div>
        <div ref={videoWrapperRef} className={styles.videoWrapper}>
          <video
            ref={videoRef}
            src="/assets/showreel/MAAD SHOWREEL.mp4"
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
