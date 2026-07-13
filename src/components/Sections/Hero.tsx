import { useRef } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

interface CharMeta {
  char: string;
  isRed: boolean;
  isBreak?: boolean;
  isSpace?: boolean;
}

const buildChars = (): CharMeta[] => {
  const lines = [
    { text: 'IDEAS THAT', red: false },
    { text: 'MOVE', red: true },
    { text: ' PEOPLE', red: false },
  ];

  const result: CharMeta[] = [];

  // Line 1: "IDEAS THAT"
  for (const ch of lines[0].text) {
    if (ch === ' ') {
      result.push({ char: '\u00A0', isRed: false, isSpace: true });
    } else {
      result.push({ char: ch, isRed: false });
    }
  }
  result.push({ char: '', isRed: false, isBreak: true });

  // Line 2: "MOVE" + " PEOPLE"
  for (const ch of lines[1].text) {
    result.push({ char: ch, isRed: true });
  }
  for (const ch of lines[2].text) {
    if (ch === ' ') {
      result.push({ char: '\u00A0', isRed: false, isSpace: true });
    } else {
      result.push({ char: ch, isRed: false });
    }
  }

  return result;
};

const chars = buildChars();

const Hero: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const headlineWrapper = headlineWrapperRef.current;
    const headline = headlineRef.current;
    const videoWrapper = videoWrapperRef.current;
    const videoContainer = videoContainerRef.current;
    const video = videoRef.current;

    if (!section || !headlineWrapper || !headline || !videoWrapper || !videoContainer || !video) return;

    const mm = gsap.matchMedia();

    // ─── DESKTOP ─────────────────────────────────────────────
    mm.add('(min-width: 1025px)', () => {
      // 1. Measure the text width and layout center offset
      const wrapperRect = headlineWrapper.getBoundingClientRect();
      const viewportW = window.innerWidth;

      const restingLeft = wrapperRect.left;
      const centredLeft = (viewportW - wrapperRect.width) / 2;
      const centreOffset = centredLeft - restingLeft;

      // ── Initial State ──
      // Position parent headlineWrapper at center
      gsap.set(headlineWrapper, { x: centreOffset, y: '-50%' });
      
      // Reset child headline to default layout
      gsap.set(headline, { x: 0, y: 0, scale: 1, opacity: 1, letterSpacing: '-2px' });
      
      // Make outer videoWrapper visible
      gsap.set(videoWrapper, {
        visibility: 'visible',
      });

      // Reset inner videoContainer (Stage 1 clipPath & Stage 2 zoom variables)
      gsap.set(videoContainer, {
        x: 0,
        y: 0,
        scale: 1,
        borderRadius: '20px',
        clipPath: 'inset(0 0 0 100%)',

        visibility: 'visible',
      });
      gsap.set(video, { scale: 1 });

      const charEls = headline.querySelectorAll(`.${styles.char}`);
      gsap.set(charEls, { opacity: 0, y: 14 });

      // ── INTRO TIMELINE ──
      const intro = gsap.timeline();

      // Step A: Character-by-character typography typing reveal
      intro.to(charEls, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
      });

      // Step B: Short human-centered pause
      intro.to({}, { duration: 0.5 });

      // Step C: Translate parent wrapper to resting left & sweep reveal video
      intro.to(headlineWrapper, {
        x: 0,
        duration: 1.4,
        ease: 'power4.inOut',
      });

      intro.to(videoContainer, {
        clipPath: 'inset(0 0 0 0%)',
        duration: 1.4,
        ease: 'power4.inOut',
      }, '<');

      // ── SCROLL TIMELINE ──
      // Calculate scale & position for videoContainer to occupy the viewport from its center
      const computeScale = () => {
        const vRect = videoContainer.getBoundingClientRect();
        const scaleX = viewportW / vRect.width;
        const scaleY = window.innerHeight / vRect.height;
        return Math.max(scaleX, scaleY);
      };

      const computeTranslate = () => {
        const vRect = videoContainer.getBoundingClientRect();
        const videoCX = vRect.left + vRect.width / 2;
        const videoCY = vRect.top + vRect.height / 2;
        const vpCX = viewportW / 2;
        const vpCY = window.innerHeight / 2;
        return { tx: vpCX - videoCX, ty: vpCY - videoCY };
      };

      const targetScale = computeScale();
      const { tx, ty } = computeTranslate();

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            console.log("SCROLLTRIGGER UPDATE - progress:", self.progress, "scroll:", self.scroll());
          }
        },
      });

      // Scale and translate the inner videoContainer
      scrollTl.to(videoContainer, {
        scale: targetScale,
        x: tx,
        y: ty,
        borderRadius: '0px',
        duration: 1,
        ease: 'none',
      }, 0);

      // Inside video content zoom-in push
      scrollTl.to(video, {
        scale: 1.15,
        duration: 1,
        ease: 'none',
      }, 0);

      // Scale child headline diagonally to bottom-left corner and fade out
      scrollTl.to(headline, {
        x: '-8vw',
        y: '28vh',
        scale: 0.45,
        opacity: 0,
        letterSpacing: '8px',
        duration: 1,
        ease: 'none',
        transformOrigin: 'left bottom',
      }, 0);

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    // ─── MOBILE / TABLET ─────────────────────────────────────
    mm.add('(max-width: 1024px)', () => {
      // Clean up desktop properties
      gsap.set(headlineWrapper, { clearProps: 'all' });
      gsap.set(headline, { clearProps: 'all' });
      gsap.set(videoWrapper, { clearProps: 'all' });
      gsap.set(videoContainer, { clearProps: 'all' });
      gsap.set(video, { clearProps: 'all' });

      const charEls = headline.querySelectorAll(`.${styles.char}`);
      gsap.set(charEls, { opacity: 0, y: 10 });
      gsap.set(videoContainer, { opacity: 0, y: 20 });

      // Lighter, touch-friendly intro timeline
      const mobileIntro = gsap.timeline();

      mobileIntro.to(charEls, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
      });

      mobileIntro.to({}, { duration: 0.3 });

      mobileIntro.to(videoContainer, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Mobile short pin scroll behavior
      const mobileScroll = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=60%',
          pin: true,
          scrub: 0.5,
        },
      });

      mobileScroll.to(headline, {
        scale: 0.8,
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'none',
      }, 0);

      mobileScroll.to(videoContainer, {
        scale: 1.15,
        duration: 1,
        ease: 'none',
      }, 0);

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.heroInner}>
        {/* Headline Outer Wrapper */}
        <div ref={headlineWrapperRef} className={styles.headlineWrapper}>
          {/* Inner Headline Heading */}
          <h1 ref={headlineRef} className={styles.headline}>
            {chars.map((meta, i) => {
              if (meta.isBreak) {
                return <br key={`br-${i}`} />;
              }
              return (
                <span
                  key={i}
                  className={`${styles.char} ${meta.isRed ? styles.red : ''} ${meta.isSpace ? styles.space : ''}`}
                >
                  {meta.char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Video Outer Wrapper */}
        <div ref={videoWrapperRef} className={styles.videoWrapper}>
          {/* Inner Video Zoom Container */}
          <div ref={videoContainerRef} className={styles.videoContainer}>
            <video
              ref={videoRef}
              className={styles.video}
              src="/assets/showreel/MAAD SHOWREEL.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
