import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Partner from './components/Partner';
import Services from './components/Services';
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
import { useEffect } from 'react';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureDirection: 'vertical',
      smooth: true,
    });

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    let scrollTriggerUpdate;
    let gsapTicker;

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
      let rafId;
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
      };
    }

    return () => {
      if (scrollTriggerUpdate) lenis.off('scroll', scrollTriggerUpdate);
      if (gsap && gsapTicker) gsap.ticker.remove(gsapTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <canvas className="cursor-trail" id="trail" style={{ display: 'none' }} />

      <main id="wrapper">
        <Navbar />
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
          <img className="light-top" src="/assets/images/item/light-top.png" alt="" />
          <img className="light-bot" src="/assets/images/item/light-bot.png" alt="" />
          <Statistic />
          <Awards />
          <Testimonials />
        </div>

        {/* Remaining sections on default background */}
        <Pricing />
        <FAQs />
        <Contact />
        <Footer />
      </main>

      <MobileMenu />
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
              <a href="/" className="logo-site">
                <i className="icon icon-davies-logo"></i>
              </a>
              <div className="btn-mobile-menu close-mb-menu text-caption link" id="close-mb-menu">
                <i className="icon icon-close"></i>
                CLOSE
              </div>
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
                          <li><a href="/" className="sub-nav-link text-white">Home Gradient</a></li>
                          <li><a href="/v2" className="sub-nav-link text-white">Home Animated</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <a href="/about" className="mb-menu-link text-display-1">
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
                          <li><a href="/work" className="sub-nav-link text-white">Works</a></li>
                          <li><a href="/work-single" className="sub-nav-link text-white">Works Single</a></li>
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
                          <li><a href="/service" className="sub-nav-link text-white">Services</a></li>
                          <li><a href="/service-single" className="sub-nav-link text-white">Services Single</a></li>
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
                          <li><a href="/blog-standard" className="sub-nav-link text-white">Blog Standard</a></li>
                          <li><a href="/blog-two-columns" className="sub-nav-link text-white">Blog Grid 2</a></li>
                          <li><a href="/blog-three-columns" className="sub-nav-link text-white">Blog Grid 3</a></li>
                          <li><a href="/blog-single" className="sub-nav-link text-white">Blog Single</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <a href="/contact" className="mb-menu-link text-display-1">
                      <span className="text">Contact</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="canvas_foot">
              <div className="left">
                <a href="mailto:FanzCreative@gmail.com" className="text-caption text-neutral-200">
                  FanzCreative@gmail.com
                </a>
                <p className="text-caption text-neutral-200">
                  CUP <span className="clock"></span>
                </p>
              </div>
              <div className="right">
                <a href="#" className="tf-link-icon text-caption text-neutral-200">
                  <i className="icon icon-arrow-top-right"></i> TWITTER (X)
                </a>
                <a href="#" className="tf-link-icon text-caption text-neutral-200">
                  <i className="icon icon-arrow-top-right"></i> DRIBBBLE
                </a>
                <a href="#" className="tf-link-icon text-caption text-neutral-200">
                  <i className="icon icon-arrow-top-right"></i> LINKEDIN
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
