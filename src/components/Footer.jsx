import { Link } from 'react-router-dom';
import { playTick, playHover } from '../hooks/useSound';

function Footer() {
  return (
    <footer>
      <div className="footer-image">
        <img loading="lazy" className="effectFade fadeUp" src="/assets/images/logo/logo-footer.png" alt="" />
      </div>

      <div className="container">
        <div className="footer-content">
          <Link to="/" className="footer-logo" aria-label="FanzCreative home" onClick={playTick} onMouseEnter={playHover}>
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
              <img loading="lazy"
                src="/assets/images/logo/fanz-logo.webp"
                alt="FanzCreative"
                style={{ width: 52, height: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </Link>
          <div className="title h6 fw-semibold">
            Get connected <br /> with FanzCreative on social
          </div>
          <div className="text">Don't miss our new updates!</div>

          <div className="tf-social-1 justify-content-center">
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Twitter X" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Twitter / X
              <div className="social-item"><i className="icon icon-twitter-x"></i></div>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Facebook
              <div className="social-item"><i className="icon icon-facebook-f"></i></div>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Instagram
              <div className="social-item"><i className="icon icon-instagram"></i></div>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-body-1 fw-semibold" onClick={playTick} onMouseEnter={playHover}>
              Linkedin
              <div className="social-item"><i className="icon icon-linkedin-in"></i></div>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <ul className="footer-links d-flex gap-24 align-items-center">
            <li><Link to="/about" className="fw-semibold link-underline link1" onClick={playTick} onMouseEnter={playHover}>About</Link></li>
            <li><Link to="/services" className="fw-semibold link-underline link1" onClick={playTick} onMouseEnter={playHover}>Services</Link></li>
            <li><Link to="/works" className="fw-semibold link-underline link1" onClick={playTick} onMouseEnter={playHover}>Works</Link></li>
            <li><Link to="/contact" className="fw-semibold link-underline link1" onClick={playTick} onMouseEnter={playHover}>Contact</Link></li>
          </ul>
          <p className="text-secondary coppy-rights text-center">
            &copy; 2026 FanzCreative. All Rights Reserved.
          </p>
          <a href="#" className="action-go-top d-flex gap-8 align-items-center justify-content-end link1" aria-label="Scroll to top" onClick={playTick} onMouseEnter={playHover}>
            <span className="fw-semibold">Back to top</span>
            <i className="icon icon-long-arrow-alt-up-solid fs-20"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
