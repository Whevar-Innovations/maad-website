import { useRef } from 'react';
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
];

const clientLogos = Array.from(
  { length: 14 },
  (_, i) => `/assets/img/clients/${i + 1}.png`,
);

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const inner = innerRef.current;

    if (!container || !overlay || !inner) return;

    // ── Cinematic entrance: content emerges through a dark overlay ──
    gsap.fromTo(
      overlay,
      { opacity: 1 },
      {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'top 20%',
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
          end: 'top 10%',
          scrub: true,
        },
        y: 0,
        ease: 'none',
      },
    );

    // ── Text column stagger ──
    if (textColRef.current) {
      gsap.fromTo(
        textColRef.current.children,
        { opacity: 0, y: 40 },
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

    // ── Card stagger ──
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, scale: 0.92, x: 50 },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power4.out',
        },
      );
    }
  }, { scope: containerRef });

  const handleNextClick = () => {
    if (cardsRef.current) {
      const maxScroll =
        cardsRef.current.scrollWidth - cardsRef.current.clientWidth;
      if (cardsRef.current.scrollLeft >= maxScroll - 15) {
        cardsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        cardsRef.current.scrollBy({ left: 380, behavior: 'smooth' });
      }
    }
  };

  // 3D card tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    gsap.to(card, {
      rotateX: ((y - cy) / cy) * -10,
      rotateY: ((x - cx) / cx) * 10,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });

    const img = card.querySelector(`.${styles.projectImage}`);
    if (img) {
      gsap.to(img, {
        x: ((x - cx) / cx) * -12,
        y: ((y - cy) / cy) * -12,
        scale: 1.06,
        ease: 'power2.out',
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.6,
    });

    const img = card.querySelector(`.${styles.projectImage}`);
    if (img) {
      gsap.to(img, { x: 0, y: 0, scale: 1, ease: 'power3.out', duration: 0.6 });
    }
  };

  const marqueeItems = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section ref={containerRef} className={styles.projectsSection} id="work">
      {/* Dark overlay that fades away — cinematic transition */}
      <div ref={overlayRef} className={styles.transitionOverlay} />

      <div ref={innerRef} className={styles.innerContent}>
        {/* Client Logos */}
        <div className={styles.clientSlider}>
          <span className={styles.trustedLabel}>TRUSTED BY</span>
          <div className={styles.marqueeTrack}>
            {marqueeItems.map((logoUrl, index) => (
              <div key={index} className={styles.marqueeItem}>
                <img
                  src={logoUrl}
                  alt={`Client ${(index % 14) + 1}`}
                  className={styles.clientLogo}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className={styles.container}>
          <div ref={textColRef} className={styles.leftCol}>
            <span className={styles.tagline}>FEATURED WORK</span>
            <h2 className={styles.title}>
              WORK
              <br />
              THAT
              <br />
              <span className={styles.redText}>MATTERS</span>
            </h2>
            <p className={styles.description}>
              A selection of our recent projects and brand stories.
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

          <div className={styles.sliderWrapper}>
            <div ref={cardsRef} className={styles.cardsContainer}>
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className={styles.projectCard}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
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
              ))}
            </div>

            <button
              className={styles.sliderNextBtn}
              onClick={handleNextClick}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" className={styles.nextArrow}>
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
    </section>
  );
};

export default Projects;
