import { playTick, playHover } from '../hooks/useSound';

function Footer() {
  return (
    <footer>
      {/* Big background logo */}
      <div className="footer-image">
        <img className="effectFade fadeUp" src="/assets/images/logo/logo-footer.png" alt="" />
      </div>

      <div className="container">
        <div className="footer-content">
          <a href="/" className="footer-logo" onClick={(e) => {
            e.preventDefault();
            playTick();
            if (window.setCurrentPage) window.setCurrentPage('home');
          }} onMouseEnter={playHover}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: '#272727',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 3px rgba(0,0,0,0.14), 0 2.77px 2.21px rgba(0,0,0,0.12)',
            }}>
              <img
                src="/assets/images/logo/fanz-logo.webp"
                alt="FanzCreative"
                style={{ width: 52, height: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </a>
          <div className="title h6 fw-semibold">
            Get connected <br /> with FanzCreative on social
          </div>
          <div className="text">Don't miss our new updates!</div>

          <div className="tf-social-1 justify-content-center">
            <a href="https://x.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Twitter / X
              <div className="social-item"><i className="icon icon-twitter-x"></i></div>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Facebook
              <div className="social-item"><i className="icon icon-facebook-f"></i></div>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Instagram
              <div className="social-item"><i className="icon icon-instagram"></i></div>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Linkedin
              <div className="social-item"><i className="icon icon-linkedin-in"></i></div>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <ul className="footer-links d-flex gap-24 align-items-center">
            <li><a href="/about"   className="fw-semibold link-underline link1" onClick={(e) => {
              e.preventDefault();
              playTick();
              if (window.setCurrentPage) window.setCurrentPage('about');
            }} onMouseEnter={playHover}>About</a></li>
            <li><a href="#services" className="fw-semibold link-underline link1" onClick={playTick} onMouseEnter={playHover}>Services</a></li>
            <li><a href="#works"    className="fw-semibold link-underline link1" onClick={playTick} onMouseEnter={playHover}>Works</a></li>
            <li><a href="#contact" className="fw-semibold link-underline link1" onClick={playTick} onMouseEnter={playHover}>Contact</a></li>
          </ul>
          <p className="text-secondary coppy-rights text-center">
            © 2026 FanzCreative. All Rights Reserved.
          </p>
          <a href="#" className="action-go-top d-flex gap-8 align-items-center justify-content-end link1" onClick={playTick} onMouseEnter={playHover}>
            <span className="fw-semibold">Back to top</span>
            <i className="icon icon-long-arrow-alt-up-solid fs-20"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
