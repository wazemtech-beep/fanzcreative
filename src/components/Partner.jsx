import { useEffect, useRef } from 'react';

/**
 * Partner — converted from `.section-partner` in index-v2.html
 *
 * The original uses `infiniteSlide` jQuery plugin (infinityslide.js).
 * Reproduced here with a pure-CSS infinite marquee so we don't need
 * the jQuery dependency. The CSS keyframe `marquee` is injected once
 * via a <style> tag approach using useEffect.
 *
 * If you later load infinityslide.js globally (like the other vendor
 * scripts), you can swap this back to data-clone attributes on the div.
 */

const PARTNERS = [
  '/assets/images/partner/brand-1-1.png',
  '/assets/images/partner/brand-1-2.png',
  '/assets/images/partner/brand-1-3.png',
  '/assets/images/partner/brand-1-4.png',
  '/assets/images/partner/brand-1-5.png',
  '/assets/images/partner/brand-1-1-1.png',
  '/assets/images/partner/brand-1-1-2.png',
  '/assets/images/partner/brand-1-2-1.png',
  '/assets/images/partner/brand-1-2-2.png',
  '/assets/images/partner/brand-1-3-1.png',
  '/assets/images/partner/brand-1-3-2.png',
  '/assets/images/partner/brand-1-4-1.png',
  '/assets/images/partner/brand-1-4-2.png',
  '/assets/images/partner/brand-1-5-1.png',
  '/assets/images/partner/brand-1-5-2.png',
];

function Partner() {
  const trackRef = useRef(null);

  /* Inject CSS marquee keyframe once */
  useEffect(() => {
    const id = 'partner-marquee-style';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes partner-marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .partner-track {
        display: flex;
        width: max-content;
        animation: partner-marquee 30s linear infinite;
      }
      .partner-track:hover { animation-play-state: paused; }
      .partner-track img {
        flex-shrink: 0;
        height: 50px;
        width: auto;
        max-width: 140px;
        margin: 0 36px;
        object-fit: contain;
        filter: brightness(0);
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      .partner-track img:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }, []);

  /* Duplicate the list to create seamless loop */
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <div className="section-partner">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="partner-wrap">
              <p className="text-secondary text fw-semibold">
                Trusted by 100+ <br /> top-tier brands
              </p>
              <div className="infiniteSlide_tech_main d-grid" style={{ overflow: 'hidden' }}>
                <div className="partner-track" ref={trackRef}>
                  {items.map((src, i) => (
                    <img key={i} src={src} alt="" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partner;
