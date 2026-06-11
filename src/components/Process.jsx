import { useRef, useEffect, useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';
import DotField from './DotField';

/**
 * Process — `.section-process` from index-v2.html
 *
 * The original used a Swiper slider initialised via data-attributes +
 * carousel.js globals. Reproduced here with a lightweight local-state
 * slider — same 3 cards, same prev/next buttons, no external dep needed.
 */

const SLIDES = [
  {
    icon: 'icon-search-solid',
    title: 'Discovery & Brief',
    text: 'We start by understanding your business, target audience, and goals. A detailed creative brief is built before any design work begins.',
    time: '2-5 DAYS',
    num: '01',
  },
  {
    icon: 'icon-paint-roller-solid',
    title: 'Concept & Design',
    text: 'We craft initial concepts — logos, layouts, moodboards, or wireframes — and refine them through structured feedback rounds.',
    time: '1-2 WEEKS',
    num: '02',
  },
  {
    icon: 'icon-desktop-solid',
    title: 'Build & Develop',
    text: 'Approved designs are brought to life — whether a website on Shopify or WordPress, a motion video, or a full brand kit.',
    time: '1-3 WEEKS',
    num: '03',
  },
  {
    icon: 'icon-check-solid',
    title: 'Deliver & Support',
    text: 'Final files are handed over clean and documented. We stay available post-launch for revisions, updates, or new requests.',
    time: '1-2 DAYS',
    num: '04',
  },
];
function Process() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => Math.max(a - 1, 0));
  const next = () => setActive((a) => Math.min(a + 1, SLIDES.length - 1));

  useEffect(() => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.swiper-slide');
    if (!card) return;
    const offset = (card.offsetWidth + 24) * active;
    trackRef.current.style.transform = `translateX(-${offset}px)`;
  }, [active]);

  return (
    <div className="section-process flat-spacing pt-0" ref={sectionRef} style={{ position: 'relative' }}>
      {/* DotField background — pink/purple dots react to cursor */}
      <DotField
        dotRadius={1.5}
        dotSpacing={16}
        gradientFrom="rgba(233, 30, 140, 0.2)"
        gradientTo="rgba(180, 100, 220, 0.12)"
        glowColor="transparent"
        glowRadius={0}
        bulgeOnly={true}
        bulgeStrength={60}
      />
      <div className="container">
        <div className="row">

          {/* Left — heading + nav arrows */}
          <div className="col-lg-5">
            <div className="process-heading h-100">
              <div className="heading-section mb-80">
                <div className="heading-sub fw-semibold effectFade fadeUp">Process</div>
                <div className="heading-title text-gradient-3 effectFade fadeRotateX">
                  From Brief <br /> to Beautiful
                </div>              </div>
              <div className="group-btn-slider">
                <div
                  className="nav-prev-swiper"
                  role="button"
                  onClick={prev}
                  style={{ opacity: active === 0 ? 0.4 : 1, cursor: active === 0 ? 'default' : 'pointer' }}
                >
                  <i className="icon icon-angle-left-solid"></i>
                </div>
                <div
                  className="nav-next-swiper"
                  role="button"
                  onClick={next}
                  style={{
                    opacity: active === SLIDES.length - 1 ? 0.4 : 1,
                    cursor: active === SLIDES.length - 1 ? 'default' : 'pointer',
                  }}
                >
                  <i className="icon icon-angle-right-solid"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Right — slides */}
          <div className="col-lg-7">
            <div className="process-slide" style={{ overflow: 'hidden' }}>
              <div
                className="swiper-wrapper"
                ref={trackRef}
                style={{
                  display: 'flex',
                  gap: 24,
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {SLIDES.map((slide, i) => (
                  <div
                    key={i}
                    className="swiper-slide"
                    style={{ flexShrink: 0, width: 'calc(56% - 12px)' }}
                  >
                    <div className="process-card">
                      <i className={`icon ${slide.icon}`}></i>
                      <div className="content">
                        <h4 className="title fw-semibold">{slide.title}</h4>
                        <p className="text text-secondary">{slide.text}</p>
                      </div>
                      <div className="bot">
                        <div className="time fw-semibold">{slide.time}</div>
                        <div className="number">
                          <span className="text-neutral-400">{slide.num}</span>
                          <span className="text-neutral-200">/04</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Process;
