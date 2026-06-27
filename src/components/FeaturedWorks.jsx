import { useLayoutEffect, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollFade } from '../hooks/useScrollFade';
import { playList, playHover } from '../hooks/useSound';
import { SLUGS } from '../constants';

/* ── Cursor-follow image wrapper ───────────────────────────────────────
   Reproduces jQuery mouseHover() from main.js.
   The "View Project" button smoothly follows the cursor inside the image.
─────────────────────────────────────────────────────────────────────── */
export function MouseFollowImage({ src, alt, onClick, href = "#" }) {
  const wrapRef   = useRef(null);
  const buttonRef = useRef(null);
  const rafRef    = useRef(null);
  const target    = useRef({ x: 0, y: 0 });
  const current   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const wrap   = wrapRef.current;
    const button = buttonRef.current;
    if (!wrap || !button) return;

    current.current = { x: wrap.offsetWidth / 2, y: wrap.offsetHeight / 2 };
    target.current  = { ...current.current };
    button.style.left = `${current.current.x}px`;
    button.style.top  = `${current.current.y}px`;

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (!rafRef.current) tick();
    };

    const onLeave = () => {
      target.current = { x: wrap.offsetWidth / 2, y: wrap.offsetHeight / 2 };
      if (!rafRef.current) tick();
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      button.style.left = `${current.current.x}px`;
      button.style.top  = `${current.current.y}px`;
      const dx = Math.abs(target.current.x - current.current.x);
      const dy = Math.abs(target.current.y - current.current.y);
      rafRef.current = (dx > 0.3 || dy > 0.3) ? requestAnimationFrame(tick) : null;
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={wrapRef} 
      className="image main-mouse-hover" 
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onClick={onClick}
    >
      <img loading="lazy" src={src} alt={alt} />
      {/* Button follows cursor — pointerEvents ON so click works */}
      <a
        ref={buttonRef}
        href={href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick(e);
          }
        }}
        className="tf-mouse view-project h6"
        style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}
      >
        View Project
        <i className="icon icon-arrow-top-right"></i>
      </a>
    </div>
  );
}

/**
 * FeaturedWorks — Sticky stacked cards version
 *
 * Keeps the existing card UI exactly the same, but changes the scroll behavior:
 * - The section pins when it reaches the viewport.
 * - Project cards stack on top of each other while scrolling.
 * - Previous cards stay visible behind the active card with slight scale/offset.
 * - After the last card is shown, the section releases and the next section continues.
 */

export const WORKS = [
  {
    img: '/assets/images/section/cora-beauty-ecommerce-mockup.jpg',
    activeDot: 0,
    title: 'Cora Beauty\nSkincare Store',
    desc: 'A luxury skincare and cosmetics e-commerce storefront showcasing clean, organic beauty products and optimized conversion funnels.',
    deliverables: 'UI/UX Design, E-commerce\nStorefront, Brand Identity',
    industry: 'Skincare & Beauty',
  },
  {
    img: '/assets/images/section/revolution-fashion-store-mockup.jpg',
    activeDot: 1,
    title: 'Revolution\nFashion Store',
    desc: 'A bold, dynamic e-commerce experience for a fast-fashion apparel brand, featuring interactive lookbooks and an optimized quick-cart system.',
    deliverables: 'UI/UX Design, E-commerce\nPlatform, Web Development',
    industry: 'Fashion & Retail',
  },
  {
    img: '/assets/images/section/marble-fashion-ecommerce-mockup.jpg',
    activeDot: 2,
    title: 'Marble\nFashion E-commerce',
    desc: 'An editorial-driven digital storefront for an upscale clothing collection, emphasizing high-resolution photography and custom grids.',
    deliverables: 'UI/UX Design, Webflow\nDevelopment, Motion Design',
    industry: 'Luxury Fashion',
  },
  {
    img: '/assets/images/section/mojave-clothing-store-mockup.jpg',
    activeDot: 3,
    title: 'Mojave\nClothing Store',
    desc: 'Minimal and functional e-commerce design highlighting sustainable outerwear fabric narratives and optimized mobile checkouts.',
    deliverables: 'Shopify Development,\nUI Design, Brand Storytelling',
    industry: 'Apparel & Outerwear',
  },
];

function FeaturedWorks() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const cardsRef = useRef([]);
  useScrollFade(sectionRef);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const pin = pinRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !pin || cards.length < 2) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 991px)', () => {
        gsap.set(cards, { clearProps: 'all' });
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      mm.add('(min-width: 992px)', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        gsap.set(cards, { clearProps: 'all' });
        return;
      }

      const activeCardOffset = 78;
      const stackPeek = 22;

      // Initial stack state: first card is the fixed top limit, all next cards wait below.
      gsap.set(cards, {
        position: 'absolute',
        inset: 0,
        transformOrigin: 'center top',
        willChange: 'transform, opacity',
      });

      cards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: index + 1,
          yPercent: index === 0 ? 0 : 115,
          y: index === 0 ? 0 : 0,
          scale: 1,
          opacity: 1,
        });
      });

      let lastActiveIndex = 0;
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * (cards.length - 1)}`,
          scrub: 0.8,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.round(self.progress * (cards.length - 1));
            if (activeIndex !== lastActiveIndex) {
              lastActiveIndex = activeIndex;
              playList();
            }
          }
        },
      });

      for (let i = 1; i < cards.length; i += 1) {
        const step = i - 1;

        // Previous cards form the background stack, but the first card never moves above its start.
        for (let j = 0; j < i; j += 1) {
          const distanceFromActive = i - j;
          timeline.to(
            cards[j],
            {
              y: j === 0 ? 0 : Math.min(activeCardOffset - stackPeek * distanceFromActive, activeCardOffset - stackPeek),
              scale: Math.max(0.88, 1 - 0.045 * distanceFromActive),
              opacity: Math.max(0.48, 1 - 0.16 * distanceFromActive),
              duration: 1,
            },
            step
          );
        }

        // New card slides up over the existing stack.
        timeline.to(
          cards[i],
          {
            yPercent: 0,
            y: activeCardOffset,
            scale: 1,
            opacity: 1,
            duration: 1,
          },
          step
        );
      }
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div id="works" className="section-featured-works sticky-works-section flat-spacing pt-0" ref={sectionRef}>
      <div className="sticky-works-pin" ref={pinRef}>
        <div className="container">

          {/* Heading inside pinned area but above the card stack via z-index */}
          <div className="heading-section mb-0 sticky-works-heading" style={{ position: 'relative', zIndex: 50 }}>
            <div className="heading-sub fw-semibold mx-auto effectFade fadeUp">Featured Works</div>
          </div>

          <div className="featured-works-list sticky-works-stack position-relative">
            {WORKS.map((work, i) => {
              const titleLines = work.title.split('\n');
              const deliverableLines = work.deliverables.split('\n');

              return (
                <div
                  key={i}
                  className="sticky-works-card"
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                >
                  <div className={`featured-works-item${i === 0 ? ' effectFade fadeUp no-div' : ''}`} onMouseEnter={playHover}>
                    <MouseFollowImage 
                      src={work.img} 
                      alt={work.title.replace('\n', ' ')} 
                      href={`/project/${SLUGS[i]}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/project/${SLUGS[i]}`);
                      }}
                    />

                    <div className="content">
                      <div className="pagi-dot">
                        {[0, 1, 2, 3].map((d) => (
                          <span key={d} className={d === work.activeDot ? 'active' : ''}></span>
                        ))}
                      </div>

                      <div className="bot">
                        <h4 className="heading fw-semibold">
                          {titleLines[0]} <br /> {titleLines[1]}
                        </h4>
                        <div className="grid-text">
                          <div className="item">
                            <div className="title text-secondary">DESCRIPTION</div>
                            <div className="text-body-3 fw-semibold">{work.desc}</div>
                          </div>
                          <div className="item">
                            <div className="title text-secondary">DELIVERABLES</div>
                            <div className="fw-semibold text-body-3">
                              {deliverableLines.map((line, index) => (
                                <span key={line}>
                                  {line}
                                  {index < deliverableLines.length - 1 && <br />}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="item">
                            <div className="title text-secondary">INDUSTRY</div>
                            <div className="fw-semibold text-body-3">{work.industry}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .sticky-works-section {
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
        }

        .sticky-works-pin {
          width: 100%;
          max-width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 70px 0;
        }

        .sticky-works-heading {
          margin-bottom: 42px !important;
        }

        .sticky-works-stack {
          height: min(72vh, 820px);
          min-height: 620px;
          position: relative;
          z-index: 1;   /* always below the heading z-index:50 */
        }

        .sticky-works-card {
          width: 100%;
        }

        .sticky-works-card .featured-works-item {
          height: 100%;
          backface-visibility: hidden;
        }

        .sticky-works-card .featured-works-item .image {
          overflow: hidden;
        }

        .sticky-works-card .featured-works-item .image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
          transition: object-position 2s ease;
        }
        .sticky-works-card .featured-works-item .image:hover img {
          object-position: center top;
        }

        @media (max-width: 991px) {
          .sticky-works-pin {
            min-height: auto;
            display: block;
            overflow: visible;
            padding: 80px 0;
          }

          .sticky-works-stack {
            height: auto;
            min-height: auto;
            display: grid;
            gap: 24px;
          }

          .sticky-works-card {
            position: relative !important;
            inset: auto !important;
            transform: none !important;
            opacity: 1 !important;
          }

          .sticky-works-card .featured-works-item {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default FeaturedWorks;
