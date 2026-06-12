import { useEffect, useRef, useState } from 'react';
import { playTick, playWhoosh, playPop, playHomeLink, playAboutLink, playHover, playClose } from '../hooks/useSound';

/**
 * Navbar — converted from `.tf-header.header2` in index-v2.html
 *
 * Original JS behaviour reproduced here:
 *  - Sticky + `header-sticky` class on scroll (background + shadow via CSS)
 *  - Desktop dropdown sub-menus (CSS :hover is kept; no extra JS needed)
 *  - Mobile hamburger opens the offcanvas overlay
 *  - Close button inside the offcanvas closes it
 *  - body overflow-hidden toggled while menu is open
 */
function Navbar() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Sticky header ─────────────────────────────────────────────────── */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 80) {
        header.classList.add('header-sticky');
      } else {
        header.classList.remove('header-sticky');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body overflow when mobile menu is open ────────────────────────── */
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  /* ── Sync open/close with the offcanvas DOM node (rendered in App) ─── */
  useEffect(() => {
    const offcanvas = document.getElementById('offcanvas-menu');
    if (!offcanvas) return;

    if (menuOpen) {
      offcanvas.classList.add('show');
    } else {
      offcanvas.classList.remove('show');
    }

    // Wire the close button rendered inside the offcanvas
    const closeBtn = document.getElementById('close-mb-menu');
    const handleClose = () => {
      setMenuOpen(false);
      playClose();
    };
    closeBtn?.addEventListener('click', handleClose);

    // Wire closing when clicking a menu link inside offcanvas
    const links = offcanvas.querySelectorAll('a');
    const handleLinkClick = () => {
      setMenuOpen(false);
      playClose();
    };
    links.forEach((link) => link.addEventListener('click', handleLinkClick));

    return () => {
      closeBtn?.removeEventListener('click', handleClose);
      links.forEach((link) => link.removeEventListener('click', handleLinkClick));
    };
  }, [menuOpen]);

  return (
    <header className="tf-header header2" ref={headerRef}>
      {/* Force nav link text black inside this header */}
      <style>{`.tf-header .header-inner .item-link { color: #000000; }`}</style>
      <div className="header-inner" style={{ background: '#ffffff' }}>

        {/* Logo — filter: invert makes the white/light logo black */}
        <a href="#" className="logo-site" onClick={playHomeLink} onMouseEnter={playHover}>
          <img
            src="/assets/images/logo/fanz-logo.png"
            alt="FanzCreative"
            style={{
              height: 44,
              width: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0)',   /* turns any colour → pure black */
            }}
          />
        </a>

        {/* Desktop navigation */}
        <nav className="box-navigation">
          <ul className="nav-menu-main">

            <li className="menu-item">
              <a href="#" className="item-link link1 active" onClick={playHomeLink} onMouseEnter={playHover}>Home</a>
            </li>

            <li className="menu-item">
              <a href="#about" className="item-link link1" onClick={playAboutLink} onMouseEnter={playHover}>About</a>
            </li>

            <li className="menu-item">
              <a href="#services" className="item-link link1" onClick={playTick} onMouseEnter={playHover}>Services</a>
            </li>

            <li className="menu-item">
              <a href="#works" className="item-link link1" onClick={playTick} onMouseEnter={playHover}>Works</a>
            </li>

            <li className="menu-item">
              <a href="#" className="item-link link1" onClick={playTick} onMouseEnter={playHover}>Blog</a>
            </li>

            <li className="menu-item">
              <a href="#contact" className="item-link link1" onClick={playTick} onMouseEnter={playHover}>Contact</a>
            </li>

          </ul>
        </nav>

        {/* CTA — desktop only */}
        <a href="#contact" className="tf-btn d-lg-flex d-none" onClick={playPop} onMouseEnter={playHover}>
          Start a Project
        </a>

        {/* Hamburger — mobile only */}
        <button
          className="tf-btn open-mb-menu mobile-menu d-lg-none d-flex"
          onClick={() => { setMenuOpen(true); playWhoosh(); }}
          aria-label="Open menu"
        >
          <i className="icon icon-grip-lines-solid"></i>
        </button>

      </div>
    </header>
  );
}

export default Navbar;
