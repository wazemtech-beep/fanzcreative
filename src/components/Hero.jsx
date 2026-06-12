import { useRef } from 'react';
import { playPop } from '../hooks/useSound';
import { useScrollFade } from '../hooks/useScrollFade';
import DarkVeil from './DarkVeil';

/**
 * Hero — converted from `.section-hero` in index-v2.html
 *
 * Scroll-fade animations delegated to the shared useScrollFade hook.
 */
function Hero() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  return (
    <div className="section-hero" ref={sectionRef}>
      {/* Remove the default grey background image from CSS */}
      <style>{`.hero-image { background-image: none !important; }`}</style>

      {/* DarkVeil WebGL background — replaces the original <video> */}
      <div
        className="hero-image"
        style={{ pointerEvents: 'none', zIndex: 0, borderRadius: 40, overflow: 'hidden' }}
      >
        <DarkVeil
          hueShift={300}
          noiseIntensity={0.04}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0.3}
          resolutionScale={1}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="content-wrap text-center">

          {/* Sub-label */}
          <div className="sub fw-semibold effectFade fadeUp">
            <SparkleIcon />
            Creative Design Agency
          </div>

          {/* Main heading */}
          <div className="title text-display-2 effectFade fadeRotateX">
            <span className="title1 fw-semibold" style={{ color: '#ffffff' }}>Design That Makes</span>
            <br />
            <div className="title2 d-flex gap-20 justify-content-center flex-wrap">
              <span className="fw-semibold" style={{ color: '#ffffff' }}>Your Brand Unforgettable</span>
              <div className="title-icon">
                <div className="box"></div>
                <div className="hero-shape-flight-zone" aria-hidden="true">
                  <div className="hero-falling-shape shape-1">
                    <img src="/assets/images/item/hero-1.svg" alt="" />
                    <img src="/assets/images/item/hero-1.svg" alt="" className="cloned" />
                  </div>
                  <div className="hero-falling-shape shape-2">
                    <img src="/assets/images/item/hero-2.svg" alt="" />
                    <img src="/assets/images/item/hero-2.svg" alt="" className="cloned" />
                  </div>
                  <div className="hero-falling-shape shape-3">
                    <img src="/assets/images/item/hero-3.svg" alt="" />
                    <img src="/assets/images/item/hero-3.svg" alt="" className="cloned" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body copy */}
          <p className="text hero-copy effectFade fadeUp" style={{ color: '#ffffff' }}>
            From stunning web design to full brand identities, motion graphics <br />
            and custom websites — we craft experiences that convert and inspire.
          </p>

          {/* CTA buttons */}
          <div className="bot-btns hero-actions effectFade fadeRotateX">
            <a href="#services" className="tf-btn" onClick={playPop}>Explore Services</a>
            <a href="#pricing" className="tf-btn-2" onClick={playPop}>View Pricing Plans</a>
          </div>

        </div>
      </div>

      {/* Scroll indicator — position:absolute + bottom:0 already set in styles.css */}
      <a href="#about" className="scroll-more" style={{ zIndex: 2 }}>
        <span className="fw-semibold link1">Scroll for more</span>
        <i className="icon icon-long-arrow-alt-down-solid"></i>
      </a>

      <style>{`
        .section-hero .content-wrap .title,
        .section-hero .content-wrap .title2 {
          position: relative;
        }

        .section-hero .content-wrap .title-icon {
          z-index: 1;
        }

        .section-hero .content-wrap .title-icon .box {
          position: relative;
          z-index: 2;
        }

        .hero-shape-flight-zone {
          position: absolute;
          z-index: 3;
          top: 0;
          left: 0;
          width: 255px;
          height: 180px;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-falling-shape {
          position: absolute;
          will-change: transform;
          animation: heroShapeFall 6.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        .hero-falling-shape img {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          max-width: none;
        }

        /* Static rotations and scales for each shape channel to keep animation path straight */
        .hero-falling-shape.shape-1 img {
          transform: rotate(-8deg) scale(0.92);
        }
        .hero-falling-shape.shape-1 img.cloned {
          transform: translateY(-180px) rotate(-8deg) scale(0.92);
        }

        .hero-falling-shape.shape-2 img {
          transform: rotate(8deg) scale(1);
        }
        .hero-falling-shape.shape-2 img.cloned {
          transform: translateY(-180px) rotate(8deg) scale(1);
        }

        .hero-falling-shape.shape-3 img {
          transform: rotate(-5deg) scale(0.94);
        }
        .hero-falling-shape.shape-3 img.cloned {
          transform: translateY(-180px) rotate(-5deg) scale(0.94);
        }

        .hero-falling-shape.shape-1 {
          top: -8px;
          left: 49px;
          animation-delay: 0s;
        }

        .hero-falling-shape.shape-2 {
          top: 22px;
          left: 136px;
          animation-delay: -2.2s;
        }

        .hero-falling-shape.shape-3 {
          top: 48px;
          left: 66px;
          animation-delay: -4.4s;
        }

        .hero-copy,
        .hero-actions {
          position: relative;
          z-index: 4;
        }

        @keyframes heroShapeFall {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, 180px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-falling-shape {
            animation: none;
          }
        }

        @media (max-width: 767px) {
          .hero-falling-shape {
            animation-duration: 7.2s;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Inline SVG kept as a component to keep Hero JSX readable ─────────── */
function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.53252 12.0966C3.75106 11.5025 4.59108 11.5025 4.81645 12.0966L5.54037 14.0567C5.60866 14.2411 5.75891 14.3913 5.9433 14.4596L7.90335 15.1835C8.49751 15.4021 8.49751 16.2421 7.90335 16.4674L5.9433 17.1914C5.75891 17.2597 5.60866 17.4099 5.54037 17.5943L4.81645 19.5543C4.59791 20.1485 3.75789 20.1485 3.53252 19.5543L2.8086 17.5943C2.74031 17.4099 2.59006 17.2597 2.40566 17.1914L0.44562 16.4674C-0.14854 16.2489 -0.14854 15.4089 0.44562 15.1835L2.40566 14.4596C2.59006 14.3913 2.74031 14.2411 2.8086 14.0567L3.53252 12.0966Z"
        fill="url(#sparkle_a)"
      />
      <path
        d="M3.53252 12.0966C3.75106 11.5025 4.59108 11.5025 4.81645 12.0966L5.54037 14.0567C5.60866 14.2411 5.75891 14.3913 5.9433 14.4596L7.90335 15.1835C8.49751 15.4021 8.49751 16.2421 7.90335 16.4674L5.9433 17.1914C5.75891 17.2597 5.60866 17.4099 5.54037 17.5943L4.81645 19.5543C4.59791 20.1485 3.75789 20.1485 3.53252 19.5543L2.8086 17.5943C2.74031 17.4099 2.59006 17.2597 2.40566 17.1914L0.44562 16.4674C-0.14854 16.2489 -0.14854 15.4089 0.44562 15.1835L2.40566 14.4596C2.59006 14.3913 2.74031 14.2411 2.8086 14.0567L3.53252 12.0966Z"
        fill="url(#sparkle_b)"
      />
      <path
        d="M11.4068 0.670991C11.7346 -0.223664 12.9981 -0.223664 13.3259 0.670991L14.7874 4.61157C14.8898 4.89157 15.1152 5.11011 15.3952 5.21938L19.3358 6.68088C20.2304 7.00869 20.2304 8.27214 19.3358 8.59995L15.3952 10.0614C15.1152 10.1639 14.8967 10.3893 14.7874 10.6693L13.3259 14.6098C12.9981 15.5045 11.7346 15.5045 11.4068 14.6098L9.94534 10.6693C9.8429 10.3893 9.61753 10.1707 9.33752 10.0614L5.39694 8.59995C4.50229 8.27214 4.50229 7.00869 5.39694 6.68088L9.33752 5.21938C9.61753 5.11694 9.83607 4.89157 9.94534 4.61157L11.4068 0.670991Z"
        fill="url(#sparkle_c)"
      />
      <path
        d="M11.4068 0.670991C11.7346 -0.223664 12.9981 -0.223664 13.3259 0.670991L14.7874 4.61157C14.8898 4.89157 15.1152 5.11011 15.3952 5.21938L19.3358 6.68088C20.2304 7.00869 20.2304 8.27214 19.3358 8.59995L15.3952 10.0614C15.1152 10.1639 14.8967 10.3893 14.7874 10.6693L13.3259 14.6098C12.9981 15.5045 11.7346 15.5045 11.4068 14.6098L9.94534 10.6693C9.8429 10.3893 9.61753 10.1707 9.33752 10.0614L5.39694 8.59995C4.50229 8.27214 4.50229 7.00869 5.39694 6.68088L9.33752 5.21938C9.61753 5.11694 9.83607 4.89157 9.94534 4.61157L11.4068 0.670991Z"
        fill="url(#sparkle_d)"
      />
      <defs>
        <linearGradient id="sparkle_a" x1="10.2993" y1="-1.30435" x2="21.6031" y2="11.1057" gradientUnits="userSpaceOnUse">
          <stop offset="1" stopColor="#555D64" />
          <stop offset="1" stopColor="#292C2E" />
        </linearGradient>
        <linearGradient id="sparkle_b" x1="10.0034" y1="0" x2="10.0034" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="1" stopColor="#df2d6d" />
          <stop offset="1" stopColor="#df2d6d" />
        </linearGradient>
        <linearGradient id="sparkle_c" x1="10.2993" y1="-1.30435" x2="21.6031" y2="11.1057" gradientUnits="userSpaceOnUse">
          <stop offset="1" stopColor="#555D64" />
          <stop offset="1" stopColor="#292C2E" />
        </linearGradient>
        <linearGradient id="sparkle_d" x1="10.0034" y1="0" x2="10.0034" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="1" stopColor="#df2d6d" />
          <stop offset="1" stopColor="#df2d6d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Hero;
