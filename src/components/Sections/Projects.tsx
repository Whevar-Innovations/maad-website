import { useRef, useState, useEffect } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
}

const projectsData: Project[] = [
  {
    id: 'tusker-malt',
    title: 'TUSKER MALT',
    tagline: 'Real Taste of Gold',
    category: 'CREATIVE CAMPAIGN',
    image: '/assets/img/projects/tusker-malt.png',
  },
  {
    id: 'tusker-lite',
    title: 'TUSKER LITE',
    tagline: 'Light Up Your Vibe',
    category: 'BRAND EXPERIENCE',
    image: '/assets/img/projects/tusker-lite.png',
  },
  {
    id: 'gotv',
    title: 'GOTV',
    tagline: 'Entertainment for Everyone',
    category: 'DIGITAL CAMPAIGN',
    image: '/assets/img/projects/Gotv.png',
  },
  {
    id: 'safaricom-data',
    title: 'SAFARICOM DATA',
    tagline: 'Connect With What Matters',
    category: 'DIGITAL CAMPAIGN',
    image: '/assets/img/projects/tusker-malt.png',
  },
  {
    id: 'guinness-smooth',
    title: 'GUINNESS SMOOTH',
    tagline: 'Flavour That Moves You',
    category: 'BRAND EXPERIENCE',
    image: '/assets/img/projects/tusker-lite.png',
  },
  {
    id: 'dstv-stream',
    title: 'DSTV STREAM',
    tagline: 'Your Home of Sport',
    category: 'CREATIVE CAMPAIGN',
    image: '/assets/img/projects/Gotv.png',
  },
  {
    id: 'kbl-corporate',
    title: 'KBL BRAND',
    tagline: 'Celebrating Our Heritage',
    category: 'CREATIVE CAMPAIGN',
    image: '/assets/img/projects/tusker-malt.png',
  },
  {
    id: 'eabl-foundation',
    title: 'EABL FOUNDATION',
    tagline: 'Empowering Communities',
    category: 'BRAND EXPERIENCE',
    image: '/assets/img/projects/tusker-lite.png',
  },
];

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // States to control smart navigation arrows
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);

  // 1. Setup ScrollTrigger entrance animations
  useGSAP(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const inner = innerRef.current;

    if (!container || !overlay || !inner) return;

    // Cinematic entrance: black overlay fades away
    gsap.fromTo(
      overlay,
      { opacity: 1 },
      {
        scrollTrigger: {
          trigger: container,
          start: 'top 95%',
          end: 'top 40%',
          scrub: true,
        },
        opacity: 0,
        ease: 'none',
      },
    );

    // Inner content rises upward with subtle parallax
    gsap.fromTo(
      inner,
      { y: 80 },
      {
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'top 20%',
          scrub: true,
        },
        y: 0,
        ease: 'none',
      },
    );

    // Text column elements stagger reveal
    if (textColRef.current) {
      gsap.fromTo(
        textColRef.current.children,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );
    }
  }, { scope: containerRef });

  // 2. Setup scroll listener for card transitions (scale/opacity/depth)
  const handleScroll = () => {
    const container = cardsRef.current;
    if (!container) return;

    // A. Update arrow visibility states
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    setShowPrevBtn(scrollLeft > 15);
    setShowNextBtn(scrollLeft < maxScroll - 15);

    // B. Calculate and apply dynamic 3D scale/depth transforms based on centering
    const containerCenter = scrollLeft + container.clientWidth / 2;
    const cards = container.children;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLDivElement;
      const cardWidth = card.clientWidth;
      const cardCenter = card.offsetLeft + cardWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      // Normalization: 0 when perfectly centered, 1 when one full card width away
      const normalizedDist = Math.min(distance / cardWidth, 1.5);

      // Card scale (active: 1.0, inactive: ~0.92)
      const scale = 1 - (0.08 * Math.min(normalizedDist, 1));

      // Card opacity (active: 1.0, inactive: ~0.65)
      const opacity = 1 - (0.35 * Math.min(normalizedDist, 1));

      // 3D Depth / translateZ (active: 0px, inactive: -40px)
      const z = -40 * Math.min(normalizedDist, 1);

      gsap.to(card, {
        scale,
        opacity,
        z,
        transformPerspective: 1000,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  // Run transforms initially on mount
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNextClick = () => {
    const container = cardsRef.current;
    if (!container || container.children.length === 0) return;
    const cardWidth = (container.children[0] as HTMLElement).clientWidth;
    const gap = 28; // gap between cards
    const currentCardIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    const nextIndex = Math.min(currentCardIndex + 1, projectsData.length - 1);
    
    container.scrollTo({
      left: nextIndex * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  const handlePrevClick = () => {
    const container = cardsRef.current;
    if (!container || container.children.length === 0) return;
    const cardWidth = (container.children[0] as HTMLElement).clientWidth;
    const gap = 28; // gap between cards
    const currentCardIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    const prevIndex = Math.max(currentCardIndex - 1, 0);
    
    container.scrollTo({
      left: prevIndex * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section ref={containerRef} className={styles.projectsSection} id="work">
      {/* Dark overlay that fades away — cinematic transition */}
      <div ref={overlayRef} className={styles.transitionOverlay} />

      <div ref={innerRef} className={styles.innerContent}>
        <div className={styles.container}>
          {/* Main content info */}
          <div ref={textColRef} className={styles.leftCol}>
            <span className={styles.tagline}>Selected Stories</span>
            <h2 className={styles.title}>
              WORK
              <br />
              THAT
              <br />
              <span className={styles.redText}>MATTERS</span>
            </h2>
            <p className={styles.description}>
              Every campaign begins with people. These are some of the stories we've helped bring to life.
            </p>
            <a href="#work" className={styles.viewAllBtn}>
              <span>VIEW ALL WORK</span>
              <span className={styles.btnArrowWrapper}>
                <svg viewBox="0 0 24 24" className={styles.btnArrow}>
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* Snap Gallery Carousel */}
          <div className={styles.sliderWrapper}>
            {showPrevBtn && (
              <button
                className={`${styles.sliderArrowBtn} ${styles.sliderPrevBtn}`}
                onClick={handlePrevClick}
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            )}

            <div
              ref={cardsRef}
              className={styles.cardsContainer}
              onScroll={handleScroll}
            >
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className={styles.projectCard}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.imageContainer}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.projectImage}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectTagline}>{project.tagline}</p>
                      <div className={styles.cardBottom}>
                        <span className={styles.categoryPill}>
                          {project.category}
                        </span>
                        <button
                          className={styles.cardArrowBtn}
                          aria-label="View project details"
                        >
                          <svg viewBox="0 0 24 24" className={styles.cardArrow}>
                            <path
                              d="M5 12h14M12 5l7 7-7 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showNextBtn && (
              <button
                className={`${styles.sliderArrowBtn} ${styles.sliderNextBtn}`}
                onClick={handleNextClick}
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
