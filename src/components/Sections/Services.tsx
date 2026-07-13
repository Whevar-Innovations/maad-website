import { useRef, useState } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceChapter {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  details: string[];
  thumbnail: string;
}

const servicesData: ServiceChapter[] = [
  {
    id: 'strategy',
    name: 'Strategy & Brand Thinking',
    subtitle: 'Understanding people before planning campaigns.',
    category: 'Human Behavior',
    description: 'We uncover the motivations, behaviours and cultural moments that shape meaningful brand connections.',
    details: ['Cultural Analysis', 'Consumer Behavior Insights', 'Brand Strategy Mapping'],
    thumbnail: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'creative',
    name: 'Creative Development',
    subtitle: 'Ideas become meaningful when people remember them.',
    category: 'Creative Concepts',
    description: 'We craft experiences that spark emotion, conversation and action.',
    details: ['Experiential Copywriting', 'Art Direction', 'Integrated Campaigns'],
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'digital',
    name: 'Digital & Social',
    subtitle: 'Technology should never replace human connection. It should strengthen it.',
    category: 'Digital Platforms',
    description: 'We create digital experiences that feel intuitive, accessible and genuinely useful.',
    details: ['UX / UI Design', 'Platform Development', 'Social Experiences'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'media',
    name: 'Media Planning & Buying',
    subtitle: 'Reaching audiences where they are, when it matters.',
    category: 'Strategic Delivery',
    description: 'We optimize media placement to deliver stories directly to the hearts and minds of the community.',
    details: ['Targeted Media Buying', 'Placement Optimization', 'Performance Analytics'],
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'content',
    name: 'Content Production',
    subtitle: 'Stories deserve to be told beautifully.',
    category: 'Content Creation',
    description: 'From concept to execution, every frame exists to move people.',
    details: ['Cinematography', 'Post-Production & Editing', 'Soundscapes & Audio'],
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'pr',
    name: 'PR & Influence',
    subtitle: 'Shaping conversations and building trust.',
    category: 'Public Trust',
    description: 'We cultivate organic reputation and influence by connecting brands with key voices and media outlets.',
    details: ['Media Relations', 'Crisis Management', 'KOL & Influencer Programs'],
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'ooh',
    name: 'OOH / Print / Radio / TV',
    subtitle: 'Traditional media crafted for modern impact.',
    category: 'Broad Reach',
    description: 'We design large-format and broadcast experiences that command attention in physical and shared spaces.',
    details: ['Billboard & OOH Design', 'Radio & TV Production', 'Press & Print Campaigns'],
    thumbnail: 'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'experiential',
    name: 'Experiential & Activations',
    subtitle: 'Physical moments of shared experience.',
    category: 'Live Brand Engagement',
    description: 'We craft live activations and environments that invite interaction and create lasting brand memories.',
    details: ['Live Activations', 'Pop-up Brand Environments', 'Exhibition Design'],
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'sbcc',
    name: 'SBCC',
    subtitle: 'Empowering behaviors, driving social change.',
    category: 'Behavior Change',
    description: 'We utilize Social and Behavior Change Communication (SBCC) to shape campaigns that inform, inspire, and drive real social impact.',
    details: ['Community Advocacy Planning', 'Advocacy Strategy', 'SBCC Media Campaigns'],
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
  },
];

const subtleBgGradients = [
  'radial-gradient(circle at center, #ffffff 0%, #f7f5f5 100%)', // Strategy
  'radial-gradient(circle at center, #fbf7f7 0%, #f5eaea 100%)', // Creative
  'radial-gradient(circle at center, #ffffff 0%, #f4f6f7 100%)', // Digital
  'radial-gradient(circle at center, #ffffff 0%, #f8f6f9 100%)', // Media
  'radial-gradient(circle at center, #ffffff 0%, #f7f7f5 100%)', // Content
  'radial-gradient(circle at center, #fcf4f4 0%, #f4e8e8 100%)', // PR
  'radial-gradient(circle at center, #ffffff 0%, #f1f3f6 100%)', // OOH
  'radial-gradient(circle at center, #faf6f4 0%, #f4eae4 100%)', // Experiential
  'radial-gradient(circle at center, #fcf2f2 0%, #f4e4e4 100%)', // SBCC
];

const Services: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const introContainerRef = useRef<HTMLDivElement>(null);
  const mainLayoutRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isOutroActive, setIsOutroActive] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const getBackgroundStyle = () => {
    if (isOutroActive) return '#000000';
    if (isIntroActive) return 'radial-gradient(circle at center, #ffffff 0%, #f7f5f5 100%)';
    return subtleBgGradients[activeIndex];
  };

  useGSAP(() => {
    const container = containerRef.current;
    const stickyWrapper = stickyWrapperRef.current;
    const introContainer = introContainerRef.current;
    const mainLayout = mainLayoutRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !stickyWrapper || !introContainer || !mainLayout || !progressBar) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const introSlides = gsap.utils.toArray<HTMLElement>(`.${styles.introSlide}`);
      const titles = gsap.utils.toArray<HTMLElement>(`.${styles.titleItem}`);
      const images = gsap.utils.toArray<HTMLElement>(`.${styles.imageItem}`);
      const details = gsap.utils.toArray<HTMLElement>(`.${styles.detailItem}`);

      // --- INITIAL STATES ---
      gsap.set(introSlides.slice(1), { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(introSlides[0], { opacity: 1, y: 0, scale: 1 });
      gsap.set(mainLayout, { opacity: 0, visibility: 'hidden' });

      gsap.set(titles.slice(1), { yPercent: 100, opacity: 0 });
      gsap.set(images.slice(1), { yPercent: 15, scale: 0.94, opacity: 0 });
      gsap.set(details.slice(1), { yPercent: 30, opacity: 0 });

      gsap.set(titles[0], { yPercent: 0, opacity: 1 });
      gsap.set(images[0], { yPercent: 0, scale: 1, opacity: 1 });
      gsap.set(details[0], { yPercent: 0, opacity: 1 });

      // --- TIMELINE SETUP ---
      // We pin the section for 12 scroll-steps (3 intro slides + 9 service chapters)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=1100%',
          scrub: 0.8,
          pin: true,
          snap: {
            snapTo: [0, 1 / 12, 2 / 12, 3 / 12, 4 / 12, 5 / 12, 6 / 12, 7 / 12, 8 / 12, 9 / 12, 10 / 12, 11 / 12, 1],
            duration: { min: 0.15, max: 0.3 },
            delay: 0.05,
            ease: 'power2.out',
          },
          onUpdate: (self) => {
            const progress = self.progress;
            
            if (progress < 3 / 12) {
              setIsIntroActive(true);
              setIsOutroActive(false);
            } else if (progress > 11 / 12) {
              setIsIntroActive(false);
              setIsOutroActive(true);
              setActiveIndex(8);
            } else {
              setIsIntroActive(false);
              setIsOutroActive(false);
              // Normalize progress range [3/12, 11/12] to range [0, 8]
              const normalized = (progress - 3 / 12) / (8 / 12);
              const activeIdx = Math.min(Math.floor(normalized * 9), 8);
              setActiveIndex(activeIdx);
            }
          },
        },
      });

      // --- STAGE A: PHILOSOPHY INTRO TRANSITIONS ---
      // Slide 0 ➔ Slide 1
      tl.to(introSlides[0], { opacity: 0, y: -30, scale: 0.95, duration: 1 }, 0)
        .to(introSlides[1], { opacity: 1, y: 0, scale: 1, duration: 1 }, 0.3);

      // Slide 1 ➔ Slide 2
      tl.to(introSlides[1], { opacity: 0, y: -30, scale: 0.95, duration: 1 }, 1)
        .to(introSlides[2], { opacity: 1, y: 0, scale: 1, duration: 1 }, 1.3);

      // Slide 2 ➔ Reveal Main Layout
      tl.to(introSlides[2], { opacity: 0, y: -30, scale: 0.95, duration: 1 }, 2)
        .to(introContainer, { opacity: 0, duration: 0.8 }, 2)
        .fromTo(
          mainLayout,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, visibility: 'visible', duration: 1.2 },
          2.2,
        );

      // --- STAGE B: OUTCOMES CHAPTER TRANSITIONS ---
      for (let i = 1; i < 9; i++) {
        const time = i + 2; // timeline triggers: 3, 4, 5, 6, 7, 8, 9, 10

        // Outgoing elements (i - 1)
        tl.to(titles[i - 1], { yPercent: -80, opacity: 0, duration: 1, ease: 'power2.inOut' }, time)
          .to(images[i - 1], { yPercent: -15, scale: 1.08, opacity: 0, duration: 1, ease: 'power2.inOut' }, time)
          .to(details[i - 1], { yPercent: -30, opacity: 0, duration: 1, ease: 'power2.inOut' }, time);

        // Incoming elements (i)
        tl.to(titles[i], { yPercent: 0, opacity: 1, duration: 1, ease: 'power2.inOut' }, time)
          .fromTo(
            images[i],
            { yPercent: 15, scale: 0.94, opacity: 0 },
            { yPercent: 0, scale: 1, opacity: 1, duration: 1, ease: 'power2.inOut' },
            time + 0.15,
          )
          .fromTo(
            details[i],
            { yPercent: 30, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            time + 0.2,
          );

        // Subtle background gradient shift
        tl.to(
          [stickyWrapper, mainLayout],
          {
            background: subtleBgGradients[i],
            duration: 1.2,
            ease: 'power1.inOut',
          },
          time,
        );

        // Progress bar indicator height
        const targetPercent = (i / 8) * 100;
        tl.to(
          progressBar,
          {
            height: `${targetPercent}%`,
            duration: 1,
            ease: 'power1.inOut',
          },
          time,
        );
      }

      // --- STAGE C: FADE TO BLACK OUTRO ---
      // Fade out elements in the final scroll block (time 11 ➔ 12)
      tl.to(
        [
          progressBar,
          `.${styles.timelineContainer}`,
          `.${styles.sectionHeader}`,
          `.${styles.titlesCol}`,
          `.${styles.detailsCol}`,
          `.${styles.imageCol}`
        ],
        { opacity: 0, duration: 0.8 },
        11
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const handleNavClick = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const windowHeight = window.innerHeight;
    
    // The pinning duration is +=1100% of window height (which is 11 * windowHeight)
    const scrollableDistance = 11 * windowHeight;

    // Services chapters are in range [3/12, 11/12] of the pinned scroll height
    const scrollProgress = 3 / 12 + (index / 8) * (8 / 12);
    const targetScroll = container.offsetTop + scrollProgress * scrollableDistance + 5;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={containerRef} className={styles.servicesSection} id="services">
      {/* DESKTOP GUIDED EXPERIENCE */}
      <div
        ref={stickyWrapperRef}
        className={styles.stickyWrapper}
        style={{ background: getBackgroundStyle() }}
      >
        <div className={styles.sectionHeader}>
          <span>02</span>
          <div className={styles.line}></div>
          <span>How We Create Impact</span>
        </div>

        {/* Philosophy Intro Slides */}
        <div
          ref={introContainerRef}
          className={`${styles.introContainer} ${isIntroActive ? styles.active : ''}`}
        >
          <div className={styles.introSlide}>
            <h2>We don't begin with campaigns.</h2>
          </div>
          <div className={styles.introSlide}>
            <h2>We begin with people.</h2>
          </div>
          <div className={styles.introSlide}>
            <h2>Everything else follows.</h2>
          </div>
        </div>

        {/* Editorial Content Layout */}
        <div
          ref={mainLayoutRef}
          className={styles.layout}
          style={{ background: getBackgroundStyle() }}
        >
          {/* Vertical Timeline Progress Bar (Omitted labels, leaving pure numbers) */}
          <div className={styles.timelineContainer}>
            <div className={styles.progressLineTrack}>
              <div ref={progressBarRef} className={styles.progressLineIndicator} />
            </div>
            <div className={styles.timelineNums}>
              {servicesData.map((_, i) => (
                <div
                  key={i}
                  className={`${styles.timelineNumWrapper} ${activeIndex === i ? styles.active : ''}`}
                  onClick={() => handleNavClick(i)}
                >
                  <span className={styles.timelineNum}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Titles Column (mix-blend overlap) */}
          <div className={styles.titlesCol}>
            {servicesData.map((service, i) => (
              <h3
                key={service.id}
                className={`${styles.titleItem} ${activeIndex === i ? styles.active : ''}`}
              >
                {service.name}
              </h3>
            ))}
          </div>

          {/* Photographic Center */}
          <div className={styles.imageCol}>
            <div className={styles.imageStack}>
              {servicesData.map((service, i) => (
                <div
                  key={service.id}
                  className={`${styles.imageItem} ${activeIndex === i ? styles.active : ''}`}
                >
                  <img src={service.thumbnail} alt={service.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Details / Deliverables Column (Details hidden by default, slide/fade on hover) */}
          <div className={styles.detailsCol}>
            {servicesData.map((service, i) => (
              <div
                key={service.id}
                className={`${styles.detailItem} ${activeIndex === i ? styles.active : ''}`}
              >
                <span className={styles.categoryLabel}>{service.category}</span>
                <h4 className={styles.subtitle}>{service.subtitle}</h4>
                <p className={styles.description}>{service.description}</p>

                <div className={styles.deliverablesList}>
                  {service.details.map((detail, idx) => (
                    <div key={idx} className={styles.deliverableRow}>
                      <span className={styles.deliverableBullet}>—</span>
                      <span className={styles.deliverableText}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE/TABLET INTERACTIVE CAROUSEL */}
      <div className={styles.mobileVersion}>
        <h2 className={styles.sectionTitle}>How We Create Impact</h2>
        
        {/* Short philosophy statements stacked at the top of mobile list */}
        <div className={styles.mobilePhilosophyBlock}>
          <p>We don't begin with campaigns.</p>
          <p className={styles.redHighlight}>We begin with people.</p>
          <p>Everything else follows.</p>
        </div>

        <div className={styles.accordionContainer}>
          {servicesData.map((service, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <div
                key={service.id}
                className={`${styles.accordionItem} ${isExpanded ? styles.expanded : ''}`}
              >
                <button
                  className={styles.accordionHeader}
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  aria-expanded={isExpanded}
                >
                  <span className={styles.accordionNum}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.accordionTitle}>{service.name}</span>
                  <span className={styles.accordionIcon}>
                    {isExpanded ? '—' : '+'}
                  </span>
                </button>
                
                <div className={`${styles.accordionContent} ${isExpanded ? styles.expanded : ''}`}>
                  <div className={styles.accordionInner}>
                    <div className={styles.mobileImage}>
                      <img src={service.thumbnail} alt={service.name} />
                    </div>
                    <div className={styles.mobileContent}>
                      <span className={styles.mobileCategory}>{service.category}</span>
                      <h4 className={styles.mobileSubtitle}>{service.subtitle}</h4>
                      <p className={styles.mobileDescription}>{service.description}</p>
                      <div className={styles.mobileDeliverables}>
                        {service.details.map((detail, idx) => (
                          <div key={idx} className={styles.mobileDeliverableRow}>
                            <span className={styles.mobileBullet}>—</span>
                            <p>{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
