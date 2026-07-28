import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { playClick, playHover, playSwoosh } from '../hooks/useSound';

const CASE_STUDIES = [
  {
    id: 'cora-beauty',
    title: 'Cora Skincare & Packaging',
    image: '/assets/images/section/cora-beauty-ecommerce-mockup.webp',
    link: '/works',
    category: 'Packaging / Brand',
  },
  {
    id: 'marble-fashion',
    title: 'Marble Couture Editorial',
    image: '/assets/images/section/marble-fashion-ecommerce-mockup.webp',
    link: '/works',
    category: 'E-Commerce / Motion',
  },
  {
    id: 'mojave-apparel',
    title: 'Mojave Outerwear Studio',
    image: '/assets/images/section/mojave-clothing-store-mockup.webp',
    link: '/works',
    category: 'Visual Identity',
  },
  {
    id: 'revolution-store',
    title: 'Revolution Digital Lab',
    image: '/assets/images/section/revolution-fashion-store-mockup.webp',
    link: '/works',
    category: 'Web App / 3D',
  },
];

function RecentWorks() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    playSwoosh();
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="recent-works-section" style={{ backgroundColor: '#09090b', color: '#ffffff', padding: '70px 0 80px', overflow: 'hidden' }}>
      <style>{`
        .rw-card-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #18181b;
          height: 380px;
          min-width: 290px;
          flex: 0 0 calc(25% - 18px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        @media (max-width: 1200px) {
          .rw-card-wrapper {
            flex: 0 0 calc(33.33% - 16px);
            min-width: 270px;
          }
        }
        @media (max-width: 768px) {
          .rw-card-wrapper {
            flex: 0 0 calc(50% - 12px);
            height: 310px;
            min-width: 240px;
          }
        }
        @media (max-width: 480px) {
          .rw-card-wrapper {
            flex: 0 0 88%;
            height: 300px;
          }
        }
        .rw-card-wrapper:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(223, 45, 109, 0.25);
          border-color: rgba(223, 45, 109, 0.4);
        }
        .rw-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rw-card-wrapper:hover .rw-card-img {
          transform: scale(1.06);
        }
        .rw-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          z-index: 2;
        }
        .rw-casestudy-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.3s ease;
          width: fit-content;
        }
        .rw-card-wrapper:hover .rw-casestudy-btn {
          background: #df2d6d;
          border-color: #df2d6d;
          box-shadow: 0 4px 15px rgba(223, 45, 109, 0.4);
        }
        .rw-nav-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .rw-nav-arrow:hover:not(:disabled) {
          background: #df2d6d;
          border-color: #df2d6d;
        }
        .rw-nav-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .rw-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="container">
        {/* Section Heading + Arrow Controls Row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px' }}>
            Recent Works
            <span style={{ display: 'inline-flex', width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid rgba(255, 255, 255, 0.3)', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              ↓
            </span>
          </h3>

          <div className="d-flex gap-2">
            <button
              className="rw-nav-arrow"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              className="rw-nav-arrow"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="rw-scroll-container d-flex gap-4"
          style={{
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '15px',
          }}
        >
          {CASE_STUDIES.map((item) => (
            <div key={item.id} className="rw-card-wrapper" style={{ scrollSnapAlign: 'start' }}>
              <img src={item.image} alt={item.title} className="rw-card-img" loading="lazy" />
              <div className="rw-card-overlay">
                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {item.category}
                </span>
                <h5 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '16px' }}>
                  {item.title}
                </h5>
                <Link
                  to={item.link}
                  className="rw-casestudy-btn"
                  onClick={playClick}
                  onMouseEnter={playHover}
                >
                  View Casestudy <span style={{ fontSize: '14px' }}>↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentWorks;
