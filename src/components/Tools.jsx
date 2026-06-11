import { useRef } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';
import Aurora from './Aurora';

function Tools() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  return (
    <div
      className="section-tools flat-spacing"
      ref={sectionRef}
      style={{ position: 'relative', backgroundColor: '#ffffff', overflow: 'hidden' }}
    >
      {/* Animated layer over the white section background */}
      <Aurora
        colorStops={['#e91e8c', '#ffffff', '#9c27b0']}
        amplitude={1.2}
        blend={0.6}
        speed={0.8}
      />

      {/* Decorative floating images — same as original, directly in section */}
      <img className="img-1 img-grow-1" src="/assets/images/item/item-4.svg" alt="" />
      <img className="img-2 img-grow-2" src="/assets/images/item/item-5.svg" alt="" />
      <img className="img-3 img-grow-3" src="/assets/images/item/item-6.svg" alt="" />
      <img className="img-4 img-grow-4" src="/assets/images/item/item-7.svg" alt="" />
      <img className="img-5 img-grow-5" src="/assets/images/item/item-8.svg" alt="" />
      <img className="img-6 img-grow-6" src="/assets/images/item/item-9.svg" alt="" />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-8 text-center">
            <div className="heading-section center mb-48">
              <div
                className="heading-sub style-1 fw-semibold effectFade fadeUp"
                style={{ color: '#ffffff' }}
              >
                Our Stack
              </div>
              <div className="heading-title effectFade fadeRotateX" style={{ color: '#000000' }}>
                We craft with industry-leading tools
              </div>
            </div>
            <div className="text effectFade fadeUp" style={{ color: 'rgba(0,0,0,0.72)' }}>
              From Figma and Adobe Creative Suite to WordPress, Shopify, and Wix — we use the best tools in the industry to bring your vision to life.
            </div>
            <a href="/contact" className="tf-btn effectFade fadeRotateX no-div">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tools;
