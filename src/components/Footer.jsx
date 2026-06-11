function Footer() {
  return (
    <footer>
      {/* Big background logo */}
      <div className="footer-image">
        <img className="effectFade fadeUp" src="/assets/images/logo/logo-footer.png" alt="" />
      </div>

      <div className="container">
        <div className="footer-content">
          <a href="/" className="footer-logo">
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
                src="/assets/images/logo/fanz-logo.png"
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
            <a href="https://x.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold">
              Twitter / X
              <div className="social-item"><i className="icon icon-twitter-x"></i></div>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold">
              Facebook
              <div className="social-item"><i className="icon icon-facebook-f"></i></div>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold">
              Instagram
              <div className="social-item"><i className="icon icon-instagram"></i></div>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold">
              Linkedin
              <div className="social-item"><i className="icon icon-linkedin-in"></i></div>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <ul className="footer-links d-flex gap-24 align-items-center">
            <li><a href="/about"   className="fw-semibold link-underline link1">About</a></li>
            <li><a href="/service" className="fw-semibold link-underline link1">Services</a></li>
            <li><a href="/work"    className="fw-semibold link-underline link1">Works</a></li>
            <li><a href="/contact" className="fw-semibold link-underline link1">Contact</a></li>
          </ul>
          <p className="text-secondary coppy-rights text-center">
            © 2026 FanzCreative. All Rights Reserved.
          </p>
          <a href="#" className="action-go-top d-flex gap-8 align-items-center justify-content-end link1">
            <span className="fw-semibold">Back to top</span>
            <i className="icon icon-long-arrow-alt-up-solid fs-20"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
