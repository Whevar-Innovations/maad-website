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
    image: '/assets/img/projects/tusker-malt.png'
  },
  {
    id: 'tusker-lite',
    title: 'TUSKER LITE',
    tagline: 'Light Up Your Vibe',
    category: 'BRAND EXPERIENCE',
    image: '/assets/img/projects/tusker-lite.png'
  },
  {
    id: 'gotv',
    title: 'GOTV',
    tagline: 'Entertainment for Everyone',
    category: 'DIGITAL CAMPAIGN',
    image: '/assets/img/projects/Gotv.png'
  },
  {
    id: 'tusker-malt1',
    title: 'TUSKER MALT',
    tagline: 'Real Taste of Gold',
    category: 'CREATIVE CAMPAIGN',
    image: '/assets/img/projects/tusker-malt.png'
  },
  {
    id: 'tusker-lite2',
    title: 'TUSKER LITE',
    tagline: 'Light Up Your Vibe',
    category: 'BRAND EXPERIENCE',
    image: '/assets/img/projects/tusker-lite.png'
  },
  {
    id: 'gotv2',
    title: 'GOTV',
    tagline: 'Entertainment for Everyone',
    category: 'DIGITAL CAMPAIGN',
    image: '/assets/img/projects/Gotv.png'
  }
];

const clientLogos = Array.from({ length: 14 }, (_, i) => `/assets/img/clients/${i + 1}.png`);

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax scroll entrance for the whole projects section
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0.9 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: true,
          },
          y: 0,
          opacity: 1,
          ease: 'none',
        }
      );
    }

    // Text column fade reveal
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
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }

    // Stagger reveal of cards
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, scale: 0.9, x: 40 },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
        }
      );
    }
  }, { scope: containerRef });

  const handleNextClick = () => {
    if (cardsRef.current) {
      const maxScroll = cardsRef.current.scrollWidth - cardsRef.current.clientWidth;
      if (cardsRef.current.scrollLeft >= maxScroll - 15) {
        cardsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        cardsRef.current.scrollBy({ left: 380, behavior: 'smooth' });
      }
    }
  };

  const marqueeItems = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section ref={containerRef} className={styles.projectsSection} id="work">
      {/* Client Logos Header Marquee */}
      <div ref={sliderRef} className={styles.clientSlider}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((logoUrl, index) => (
            <div key={index} className={styles.marqueeItem}>
              <img src={logoUrl} alt={`Trusted client logo ${index + 1}`} className={styles.clientLogo} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Left Column Content */}
        <div ref={textColRef} className={styles.leftCol}>
          <span className={styles.tagline}>FEATURED WORK</span>
          <h2 className={styles.title}>
            WORK<br />THAT<br /><span className={styles.redText}>MATTERS</span>
          </h2>
          <p className={styles.description}>
            A selection of our recent projects and brand stories.
          </p>
          <a href="#work" className={styles.viewAllBtn}>
            <span className={styles.btnText}>VIEW ALL WORK</span>
            <span className={styles.btnArrowWrapper}>
              <svg viewBox="0 0 24 24" className={styles.btnArrow}>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </span>
          </a>
        </div>

        {/* Right Column Cards Slider */}
        <div className={styles.sliderWrapper}>
          <div ref={cardsRef} className={styles.cardsContainer}>
            {projectsData.map((project) => (
              <div key={project.id} className={styles.projectCard}>
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
                    <span className={styles.categoryPill}>{project.category}</span>
                    <button className={styles.cardArrowBtn} aria-label="View project details">
                      <svg viewBox="0 0 24 24" className={styles.cardArrow}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Slider Control Arrow */}
          <button className={styles.sliderNextBtn} onClick={handleNextClick} aria-label="Next slide">
            <svg viewBox="0 0 24 24" className={styles.nextArrow}>
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
