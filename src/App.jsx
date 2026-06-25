import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Partner from './components/Partner';
import Services from './components/Services';
import { playSpiral, playClose, useSoundState, playSwitch, playHover, useAudioConfig, playClick } from './hooks/useSound';
import FeaturedWorks from './components/FeaturedWorks';
import Process from './components/Process';
import Benefits from './components/Benefits';
import Features from './components/Features';
import Tools from './components/Tools';
import Statistic from './components/Statistic';
import Awards from './components/Awards';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import WorkSingle from './components/WorkSingle';
import NotFound from './components/NotFound';
import AboutPage from './components/AboutPage';

export const SLUGS = [
  'cora-beauty-skincare',
  'revolution-fashion-store',
  'marble-fashion-ecommerce',
  'mojave-clothing-store'
];

const parseLocation = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '') {
    return { page: 'home', projectIndex: 0 };
  }
  if (path === '/about') {
    return { page: 'about', projectIndex: 0 };
  }
  if (path.startsWith('/project/')) {
    const slug = path.replace('/project/', '');
    const index = SLUGS.indexOf(slug);
    if (index !== -1) {
      return { page: 'work-single', projectIndex: index };
    }
  }
  return { page: '404', projectIndex: 0 };
};

function App() {
  const initial = parseLocation();
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [selectedProject, setSelectedProject] = useState(initial.projectIndex);
  const [pendingAnchor, setPendingAnchor] = useState(null);
  const lenisRef = useRef(null);

  // Expose global page switcher with optional anchor target or project index
  useEffect(() => {
    window.setCurrentPage = (page, target = null) => {
      if (page === 'work-single' && typeof target === 'number') {
        const slug = SLUGS[target] || SLUGS[0];
        window.history.pushState({ page: 'work-single', projectIndex: target }, '', `/project/${slug}`);
        setCurrentPage('work-single');
        setSelectedProject(target);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (page === 'about') {
        window.history.pushState({ page: 'about' }, '', '/about');
        setCurrentPage('about');
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (page === 'home') {
        // Keep the address bar cleanly at '/' (no trailing hash or /#)
        window.history.pushState({ page: 'home' }, '', '/');
        setCurrentPage('home');
        if (typeof target === 'string' && target.startsWith('#')) {
          setPendingAnchor(target);
        } else {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        }
      }
    };

    const handlePopState = (e) => {
      const state = e.state || parseLocation();
      if (state.page === 'work-single') {
        setCurrentPage('work-single');
        setSelectedProject(state.projectIndex);
      } else if (state.page === 'about') {
        setCurrentPage('about');
      } else if (state.page === '404') {
        setCurrentPage('404');
      } else {
        setCurrentPage('home');
        const hash = window.location.hash;
        if (hash) {
          setPendingAnchor(hash);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      delete window.setCurrentPage;
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle scrolling to pending anchors when home page loads
  useEffect(() => {
    if (currentPage === 'home' && pendingAnchor) {
      setTimeout(() => {
        const element = document.querySelector(pendingAnchor);
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element);
        } else if (pendingAnchor === '#') {
          if (lenisRef.current) lenisRef.current.scrollTo(0);
        }
        setPendingAnchor(null);
      }, 150);
    }
  }, [currentPage, pendingAnchor]);

  useEffect(() => {
    playSpiral();
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureDirection: 'vertical',
      smooth: true,
    });
    lenisRef.current = lenis;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    let scrollTriggerUpdate;
    let gsapTicker;
    let rafId;

    if (gsap && ScrollTrigger) {
      scrollTriggerUpdate = () => ScrollTrigger.update();
      lenis.on('scroll', scrollTriggerUpdate);

      gsapTicker = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(gsapTicker);
      gsap.ticker.lagSmoothing(0);

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    } else {
      // Fallback requestAnimationFrame loop if GSAP isn't ready/loaded
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Intercept any link clicking starting with '#' and smoothly scroll using Lenis
    const handleAnchorClick = (e) => {
      if (e.defaultPrevented) return;
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        // If we are not on the home page, redirect to home page with pending anchor
        if (window.currentPage !== 'home' && window.setCurrentPage) {
          window.setCurrentPage('home', href);
          return;
        }

        if (href === '#') {
          lenis.scrollTo(0);
        } else {
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element);
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (scrollTriggerUpdate) lenis.off('scroll', scrollTriggerUpdate);
      if (gsap && gsapTicker) gsap.ticker.remove(gsapTicker);
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, [currentPage]);

  // Keep window.currentPage updated so handleAnchorClick has correct value
  useEffect(() => {
    window.currentPage = currentPage;
  }, [currentPage]);

  return (
    <>
      <canvas className="cursor-trail" id="trail" style={{ display: 'none' }} />

      <main id="wrapper">
        <Navbar is404={currentPage === '404'} currentPage={currentPage} />

        {currentPage === 'home' ? (
          <>
            <Hero />
            <AboutUs />
            <Partner />

            {/* box-white — light background block (Services → Features) */}
            <div className="box-white">
              <Services />
              <FeaturedWorks />
              <Process />
              <Benefits />
              <Features />
            </div>

            {/* Tools sits outside box-white, before box-black */}
            <Tools />

            {/* box-black — dark background block (Team → Testimonials) */}
            <div className="box-black">
              <div className="light-box"></div>
              <img className="light-top" src="/assets/images/item/light-top.webp" alt="" />
              <img className="light-bot" src="/assets/images/item/light-bot.webp" alt="" style={{ display: 'block', marginBottom: '-4px' }} />
              <Statistic />
              <Awards />
              <Testimonials />
            </div>

            {/* Remaining sections on default background */}
            <Pricing />
            <FAQs />
            <Contact />
          </>
        ) : currentPage === 'work-single' ? (
          <WorkSingle projectIndex={selectedProject} />
        ) : currentPage === 'about' ? (
          <AboutPage />
        ) : (
          <NotFound />
        )}

        <Footer />
      </main>

      <MobileMenu />

      <SoundToggle />
    </>
  );
}

/* ─── Mobile Offcanvas Menu ──────────────────────────────────────────────── */
function MobileMenu() {
  return (
    <div className="offcanvas-menu" id="offcanvas-menu">
      <div className="offcanvas-content">
        <div className="container h-100">
          <div className="offcanvas-content_wrapin">

            <div className="canvas_head">
              <a href="#" className="logo-site">
                <i className="icon icon-davies-logo"></i>
              </a>
              <button
                type="button"
                className="btn-mobile-menu close-mb-menu mobile-close-button text-caption"
                id="close-mb-menu"
                aria-label="Close navigation menu"
                onClick={playClose}
              >
                <i className="icon icon-close"></i>
                Close Menu
              </button>
            </div>

            <div className="canvas_center">
              <ul className="nav-ul-mb" id="mobile-menu">
                <li>
                  <div className="item">
                    <div className="has-sub-menu">
                      <a href="#dropdown-menu-index" className="mb-menu-link text-display-1 collapsed"
                        data-bs-toggle="collapse" aria-expanded="false" aria-controls="dropdown-menu-index">
                        <span className="text">Home</span>
                      </a>
                      <div id="dropdown-menu-index" className="collapse" data-bs-parent="#mobile-menu">
                        <ul className="sub-nav-menu">
                          <li><a href="#" className="sub-nav-link text-white">Home Gradient</a></li>
                          <li><a href="#" className="sub-nav-link text-white">Home Animated</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <a href="/about" className="mb-menu-link text-display-1" onClick={(e) => {
                      e.preventDefault();
                      playAboutLink();
                      if (window.setCurrentPage) window.setCurrentPage('about');
                    }}>
                      <span className="text">About</span>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <div className="has-sub-menu">
                      <a href="#dropdown-menu-1" className="mb-menu-link text-display-1 collapsed"
                        data-bs-toggle="collapse" aria-expanded="false" aria-controls="dropdown-menu-1">
                        <span className="text">Works</span>
                      </a>
                      <div id="dropdown-menu-1" className="collapse" data-bs-parent="#mobile-menu">
                        <ul className="sub-nav-menu">
                          <li><a href="#works" className="sub-nav-link text-white">Works</a></li>
                          <li><a href="#works" className="sub-nav-link text-white">Works Single</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <div className="has-sub-menu">
                      <a href="#dropdown-menu-2" className="mb-menu-link text-display-1 collapsed"
                        data-bs-toggle="collapse" aria-expanded="false" aria-controls="dropdown-menu-2">
                        <span className="text">Services</span>
                      </a>
                      <div id="dropdown-menu-2" className="collapse" data-bs-parent="#mobile-menu">
                        <ul className="sub-nav-menu">
                          <li><a href="#services" className="sub-nav-link text-white">Services</a></li>
                          <li><a href="#services" className="sub-nav-link text-white">Services Single</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <div className="has-sub-menu">
                      <a href="#dropdown-menu-3" className="mb-menu-link text-display-1 collapsed"
                        data-bs-toggle="collapse" aria-expanded="false" aria-controls="dropdown-menu-3">
                        <span className="text">Blog</span>
                      </a>
                      <div id="dropdown-menu-3" className="collapse" data-bs-parent="#mobile-menu">
                        <ul className="sub-nav-menu">
                          <li><a href="#" className="sub-nav-link text-white">Blog Standard</a></li>
                          <li><a href="#" className="sub-nav-link text-white">Blog Grid 2</a></li>
                          <li><a href="#" className="sub-nav-link text-white">Blog Grid 3</a></li>
                          <li><a href="#" className="sub-nav-link text-white">Blog Single</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <a href="#contact" className="mb-menu-link text-display-1">
                      <span className="text">Contact</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        .offcanvas-menu .mobile-close-button {
          appearance: none;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 999px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .offcanvas-menu .mobile-close-button .icon {
          font-size: 18px;
        }

        .offcanvas-menu .mobile-close-button:hover,
        .offcanvas-menu .mobile-close-button:focus-visible {
          background: #ffffff;
          color: #18181b;
          outline: none;
        }
      `}</style>
    </div>
  );
}

/* ─── Floating Sound Toggle Button ────────────────────────────────────────── */
function SoundToggle() {
  const [config, setConfig] = useAudioConfig();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  // Click away listener to close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMaster = () => {
    setConfig({ soundEnabled: !config.soundEnabled });
    playSwitch();
  };

  const toggleMusic = () => {
    setConfig({ musicEnabled: !config.musicEnabled });
    playClick();
  };

  const toggleSFX = () => {
    setConfig({ sfxEnabled: !config.sfxEnabled });
    playClick();
  };

  const isMasterOn = config.soundEnabled;
  const isMusicOn = config.musicEnabled;
  const isSFXOn = config.sfxEnabled;

  return (
    <div className="sound-widget-container" ref={containerRef}>
      {/* Sleek Glassmorphic Popover Control Panel */}
      {menuOpen && (
        <div className="sound-control-panel">
          <div className="panel-header">
            <span className="panel-title">Audio Settings</span>
          </div>

          <div className="control-rows">
            {/* Master Sound Switch */}
            <div className="control-row">
              <span className="control-label">Master Sound</span>
              <button
                className={`switch-control ${isMasterOn ? 'active' : ''}`}
                onClick={toggleMaster}
                aria-label="Toggle Master Audio"
              >
                <span className="switch-slider"></span>
              </button>
            </div>

            {/* Ambient Music Switch */}
            <div className="control-row">
              <span className="control-label">Ambient Theme</span>
              <button
                className={`switch-control ${isMusicOn ? 'active' : ''}`}
                onClick={toggleMusic}
                disabled={!isMasterOn}
                aria-label="Toggle Ambient Theme"
              >
                <span className="switch-slider"></span>
              </button>
            </div>

            {/* Sound Effects Switch */}
            <div className="control-row">
              <span className="control-label">Sound Effects</span>
              <button
                className={`switch-control ${isSFXOn ? 'active' : ''}`}
                onClick={toggleSFX}
                disabled={!isMasterOn}
                aria-label="Toggle Sound Effects"
              >
                <span className="switch-slider"></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary Floating Switch Button */}
      <button
        className={`floating-sound-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => { setMenuOpen(!menuOpen); playClick(); }}
        onMouseEnter={playHover}
        aria-label="Audio controls"
      >
        <span className="icon-wrap">
          {!isMasterOn || (!isMusicOn && !isSFXOn) ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="playing-waves">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="wave-inner"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="wave-outer"></path>
            </svg>
          )}
        </span>
      </button>

      <style>{`
        .sound-widget-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .floating-sound-toggle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          color: #000000;
          outline: none;
        }

        .floating-sound-toggle:hover,
        .floating-sound-toggle.active {
          transform: scale(1.08);
          background-color: #000000;
          color: #ffffff;
          border-color: #000000;
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.25);
        }

        .floating-sound-toggle .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes sound-wave-pulse {
          0% { opacity: 0.35; }
          50% { opacity: 1; }
          100% { opacity: 0.35; }
        }

        .playing-waves .wave-inner {
          animation: sound-wave-pulse 1.2s ease-in-out infinite;
        }

        .playing-waves .wave-outer {
          animation: sound-wave-pulse 1.2s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        /* Sleek Glassmorphic Popover Control Panel */
        .sound-control-panel {
          position: absolute;
          bottom: 72px;
          right: 0;
          width: 220px;
          background: rgba(15, 15, 17, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4);
          border-radius: 16px;
          padding: 16px;
          color: #ffffff;
          animation: popoverFadeIn 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: bottom right;
        }

        @keyframes popoverFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .panel-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 8px;
          margin-bottom: 12px;
        }

        .panel-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: rgba(255, 255, 255, 0.5);
        }

        .control-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .control-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 600;
        }

        .control-row .control-label {
          color: #f4f4f5;
        }

        /* Switch Control Slider Switch */
        .switch-control {
          position: relative;
          width: 38px;
          height: 20px;
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 99px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
          padding: 0;
          outline: none;
        }

        .switch-control[disabled] {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .switch-control.active {
          background-color: #df2d6d;
        }

        .switch-slider {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #ffffff;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .switch-control.active .switch-slider {
          transform: translateX(18px);
        }

        @media (max-width: 767px) {
          .sound-widget-container {
            bottom: 20px;
            right: 20px;
          }
          .floating-sound-toggle {
            width: 46px;
            height: 46px;
          }
          .sound-control-panel {
            bottom: 60px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
