import { useRef, useState } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 'strategy',
    name: 'Strategy & Brand Thinking',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Innovation',
    details: ['Market Analysis', 'Brand Positioning', 'Consumer Insights']
  },
  {
    id: 'creative',
    name: 'Creative Development',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Design',
    details: ['Visual Identity', 'Campaign Concept', 'Art Direction']
  },
  {
    id: 'digital',
    name: 'Digital & Social',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Social Media',
    details: ['Content Strategy', 'Social Management', 'Influencer Marketing']
  },
  {
    id: 'media',
    name: 'Media Planning & Buying',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Advertising',
    details: ['Media Strategy', 'Programmatic Buying', 'Performance Marketing']
  },
  {
    id: 'content',
    name: 'Content Production',
    thumbnail: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Production',
    details: ['Video Production', 'Photography', 'Motion Graphics']
  },
  {
    id: 'pr',
    name: 'PR & Influence',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Public Relations',
    details: ['Media Relations', 'Crisis Management', 'Event PR']
  },
  {
    id: 'ooh',
    name: 'OOH / Print / Radio / TV',
    thumbnail: 'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Traditional',
    details: ['Billboard Design', 'Print Advertising', 'TVC Production']
  },
  {
    id: 'experiential',
    name: 'Experiential & Activations',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    href: '#',
    category: 'Events',
    details: ['Brand Activations', 'Event Management', 'Pop-up Stores']
  },
];

const Services: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const titles = gsap.utils.toArray<HTMLElement>(`.${styles.titleItem}`);
      const images = gsap.utils.toArray<HTMLElement>(`.${styles.imageItem}`);
      const details = gsap.utils.toArray<HTMLElement>(`.${styles.detailItem}`);

      // Set initial states
      gsap.set(titles.slice(1), { yPercent: 100, opacity: 0 });
      gsap.set(images.slice(1), { yPercent: 100 });
      gsap.set(details.slice(1), { yPercent: 50, opacity: 0 });
      
      gsap.set(titles[0], { yPercent: 0, opacity: 1 });
      gsap.set(images[0], { yPercent: 0 });
      gsap.set(details[0], { yPercent: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=700%', // 7 transitions for 8 items
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (servicesData.length - 1));
            setActiveIndex(index);
          }
        }
      });

      servicesData.forEach((_, i) => {
        if (i === 0) return;

        const prevTitle = titles[i - 1];
        const currentTitle = titles[i];
        const prevImage = images[i - 1];
        const currentImage = images[i];
        const prevDetail = details[i - 1];
        const currentDetail = details[i];

        tl.to(prevTitle, { yPercent: -50, opacity: 0, duration: 1 }, i)
          .to(currentTitle, { yPercent: 0, opacity: 1, duration: 1 }, i)
          
          .to(prevImage, { yPercent: -20, scale: 1.1, duration: 1 }, i)
          .fromTo(currentImage, { yPercent: 100 }, { yPercent: 0, duration: 1 }, i)
          
          .to(prevDetail, { yPercent: -30, opacity: 0, duration: 1 }, i)
          .to(currentDetail, { yPercent: 0, opacity: 1, duration: 1 }, i);
      });

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const handleNavClick = (index: number) => {
    if (!containerRef.current) return;
    
    const totalHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = totalHeight - windowHeight;
    const scrollPos = containerRef.current.offsetTop + (index / (servicesData.length - 1)) * scrollableDistance;
    
    window.scrollTo({
      top: scrollPos,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={containerRef} className={styles.servicesSection} id="services">
      {/* DESKTOP VERSION */}
      <div className={styles.stickyWrapper}>
        <div className={styles.sectionHeader}>
          <span>02</span>
          <div className={styles.line}></div>
          <span>What we do</span>
        </div>

        <div className={styles.pagination}>
          {servicesData.map((_, i) => (
            <span key={i} className={`${styles.pageNum} ${activeIndex === i ? styles.active : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>

        <div className={styles.layout}>
          {/* Titles */}
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

          {/* Center Image */}
          <div className={styles.imageCol}>
            <div className={styles.imageStack}>
              {servicesData.map((service, i) => (
                <div key={service.id} className={`${styles.imageItem} image-${i}`}>
                  <img src={service.thumbnail} alt={service.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className={styles.detailsCol}>
            {servicesData.map((service, i) => (
              <div key={service.id} className={`${styles.detailItem} detail-${i}`}>
                <span>{service.category}</span>
                {service.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Thumbs Navigation */}
          <div className={styles.navCol}>
            {servicesData.map((service, i) => (
              <div 
                key={service.id} 
                className={`${styles.navItem} ${activeIndex === i ? styles.active : ''}`}
                onClick={() => handleNavClick(i)}
              >
                <div className={styles.dash}></div>
                <div className={styles.navThumb}>
                  <img src={service.thumbnail} alt={service.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VERSION */}
      <div className={styles.mobileVersion}>
        <h2 className={styles.sectionTitle}>What We Do</h2>
        <div className={styles.mobileSlider}>
          {servicesData.map((service) => (
            <div key={service.id} className={styles.mobileItem}>
              <div className={styles.mobileImage}>
                <img src={service.thumbnail} alt={service.name} />
              </div>
              <div className={styles.mobileContent}>
                <span className={styles.mobileCategory}>{service.category}</span>
                <h3 className={styles.mobileName}>{service.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
