import { useRef } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';
import Aurora from './Aurora';
import { playPop, playSmiley } from '../hooks/useSound';

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

      <style>{`
        @keyframes float-1 { 0%, 100% { transform: scale(1) rotate(30deg) translateY(0px); } 50% { transform: scale(1) rotate(30deg) translateY(-20px); } }
        @keyframes float-2 { 0%, 100% { transform: scale(1) rotate(-12deg) translateY(0px); } 50% { transform: scale(1) rotate(-12deg) translateY(-20px); } }
        @keyframes float-3 { 0%, 100% { transform: scale(1) rotate(-15deg) translateY(0px); } 50% { transform: scale(1) rotate(-15deg) translateY(-20px); } }
        @keyframes float-4 { 0%, 100% { transform: scale(1) rotate(-15deg) translateY(0px); } 50% { transform: scale(1) rotate(-15deg) translateY(-20px); } }
        @keyframes float-5 { 0%, 100% { transform: scale(1) rotate(15deg) translateY(0px); } 50% { transform: scale(1) rotate(15deg) translateY(-20px); } }
        @keyframes float-6 { 0%, 100% { transform: scale(1) rotate(30deg) translateY(0px); } 50% { transform: scale(1) rotate(30deg) translateY(-20px); } }
        
        .float-anim-1 { animation: float-1 4s ease-in-out infinite; }
        .float-anim-2 { animation: float-2 5s ease-in-out infinite 1s; }
        .float-anim-3 { animation: float-3 3.5s ease-in-out infinite 0.5s; }
        .float-anim-4 { animation: float-4 4.5s ease-in-out infinite 1.5s; }
        .float-anim-5 { animation: float-5 4s ease-in-out infinite 0.2s; }
        .float-anim-6 { animation: float-6 5.5s ease-in-out infinite 0.8s; }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-8deg) scale(1.1); }
          75% { transform: rotate(8deg) scale(1.1); }
        }
        .float-anim-1:hover,
        .float-anim-2:hover,
        .float-anim-3:hover,
        .float-anim-4:hover,
        .float-anim-5:hover,
        .float-anim-6:hover {
          animation: wiggle 0.5s ease-in-out;
          cursor: pointer;
        }
      `}</style>

      {/* Decorative floating images with medium-level animation */}
      <img loading="lazy" className="img-1 float-anim-1" src="/assets/images/item/item-4.svg" alt="" onMouseEnter={() => playSmiley(0)} />
      <img loading="lazy" className="img-2 float-anim-2" src="/assets/images/item/item-5.svg" alt="" onMouseEnter={() => playSmiley(1)} />
      <img loading="lazy" className="img-3 float-anim-3" src="/assets/images/item/item-6.svg" alt="" onMouseEnter={() => playSmiley(2)} />
      <img loading="lazy" className="img-4 float-anim-4" src="/assets/images/item/item-7.svg" alt="" onMouseEnter={() => playSmiley(3)} />
      <img loading="lazy" className="img-5 float-anim-5" src="/assets/images/item/item-8.svg" alt="" onMouseEnter={() => playSmiley(0)} />
      <img loading="lazy" className="img-6 float-anim-6" src="/assets/images/item/item-9.svg" alt="" onMouseEnter={() => playSmiley(1)} />

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
            <a href="#contact" className="tf-btn effectFade fadeRotateX no-div" onClick={playPop}>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tools;
