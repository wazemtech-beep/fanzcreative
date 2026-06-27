import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { playTick, playWhoosh, playPop, playHomeLink, playAboutLink, playHover, playClose } from '../hooks/useSound';

function Navbar({ is404 = false, currentPage = 'home' }) {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  useEffect(() => {
    const offcanvas = document.getElementById('offcanvas-menu');
    if (!offcanvas) return;

    if (menuOpen) {
      offcanvas.classList.add('show');
    } else {
      offcanvas.classList.remove('show');
    }

    const closeBtn = document.getElementById('close-mb-menu');
    const handleClose = () => {
      setMenuOpen(false);
      playClose();
    };
    closeBtn?.addEventListener('click', handleClose);

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
      <style>{`.tf-header .header-inner .item-link { color: ${is404 ? '#ffffff' : '#000000'}; }`}</style>
      <div className="header-inner" style={{ background: is404 ? '#09090b' : '#ffffff' }}>

        <Link to="/" className="logo-site" aria-label="FanzCreative home" onClick={playHomeLink} onMouseEnter={playHover}>
          <img
            src="/assets/images/logo/fanz-logo.webp"
            alt="FanzCreative"
            style={{
              height: 44,
              width: 'auto',
              objectFit: 'contain',
              filter: is404 ? 'none' : 'brightness(0)',
            }}
          />
        </Link>

        <nav className="box-navigation">
          <ul className="nav-menu-main">
            <li className="menu-item">
              <Link to="/" className={`item-link link1 ${currentPage === 'home' ? 'active' : ''}`} aria-current={currentPage === 'home' ? 'page' : undefined} onClick={playHomeLink} onMouseEnter={playHover}>Home</Link>
            </li>
            <li className="menu-item">
              <Link to="/about" className={`item-link link1 ${currentPage === 'about' ? 'active' : ''}`} aria-current={currentPage === 'about' ? 'page' : undefined} onClick={playAboutLink} onMouseEnter={playHover}>About</Link>
            </li>
            <li className="menu-item">
              <Link to="/services" className={`item-link link1 ${currentPage === 'services' ? 'active' : ''}`} aria-current={currentPage === 'services' ? 'page' : undefined} onClick={playTick} onMouseEnter={playHover}>Services</Link>
            </li>
            <li className="menu-item">
              <Link to="/works" className={`item-link link1 ${currentPage === 'works' ? 'active' : ''}`} aria-current={currentPage === 'works' ? 'page' : undefined} onClick={playTick} onMouseEnter={playHover}>Works</Link>
            </li>
            <li className="menu-item">
              <Link to="/blog" className={`item-link link1 ${location.pathname.startsWith('/blog') ? 'active' : ''}`} aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined} onClick={playTick} onMouseEnter={playHover}>Blog</Link>
            </li>
            <li className="menu-item">
              <Link to="/contact" className={`item-link link1 ${location.pathname === '/contact' ? 'active' : ''}`} onClick={playTick} onMouseEnter={playHover}>Contact</Link>
            </li>
          </ul>
        </nav>

        <Link
          to="/contact"
          className="tf-btn d-lg-flex d-none"
          aria-label="Start a Project"
          onClick={playPop}
          onMouseEnter={playHover}
          style={is404 ? { background: '#ffffff', color: '#09090b', borderColor: '#ffffff' } : {}}
        >
          Start a Project
        </Link>

        <button
          className="tf-btn open-mb-menu mobile-menu d-lg-none d-flex"
          onClick={() => { setMenuOpen(true); playWhoosh(); }}
          aria-label="Open menu"
          style={{
            color: is404 ? '#ffffff' : '#000000',
            borderColor: is404 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <i className="icon icon-grip-lines-solid"></i>
        </button>

      </div>
    </header>
  );
}

export default Navbar;
