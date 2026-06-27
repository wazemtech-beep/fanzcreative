import { useRef } from 'react';
import { playPop } from '../hooks/useSound';
import { useScrollFade } from '../hooks/useScrollFade';
import DarkVeil from './DarkVeil';
import SparkleIcon from './icons/SparkleIcon';

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

export default Hero;
