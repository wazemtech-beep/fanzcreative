import { useRef, useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';
import { playClick, playLongClick, playHover } from '../hooks/useSound';
import FAQs from '../components/FAQs';
import AnimatedTitleIcon from '../components/AnimatedTitleIcon';

function ContactPage() {
  const pageRef = useRef(null);
  useScrollFade(pageRef);

  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name } = e.target;
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.phone.trim()) nextErrors.phone = 'Please enter your phone or email.';
    if (!form.message.trim()) nextErrors.message = 'Please tell us a little about your project.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      playClick();
      return;
    }

    setSubmitting(true);
    playLongClick();

    setTimeout(() => {
      setSubmitting(false);
      alert('Message sent!');
      setForm({ name: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <div className="wrapper" ref={pageRef}>
      {/* Hero Banner */}
      <div className="section-hero v1">
        <div className="hero-image">
        </div>
        <div className="container">
          <div className="content-wrap text-center">
            <div className="title text-display-2 effectFade fadeRotateX">
              <span className="title1 fw-semibold text-gradient-1">Let’s Build Intelligent</span>
              <br />
              <div className="title2 d-flex gap-20 justify-content-center flex-wrap">
                <span className="fw-semibold text-gradient-1">Things</span>
                <AnimatedTitleIcon />
              </div>
            </div>
            <p className="text effectFade fadeUp">
              Reach out to our team today and let’s collaborate to turn your ideas into innovative <br /> solutions that truly inspire
            </p>
          </div>
        </div>
      </div>
      {/* /Hero Banner */}

      {/* section-contact */}
      <div id="contact" className="flat-spacing">
        <div className="section-contact p-0">
          <div className="container">
            <div className="row mb-60">
              <div className="col-md-4 md-mb-24">
                <div className="box-contact-item text-center effectFade fadeUp">
                  <i className="icon icon-envelope-solid"></i>
                  <h6 className="title fw-semibold">E-mail address</h6>
                  <a className="text" href="mailto:hello@fanzcreative.design" onMouseEnter={playHover}>
                    hello@fanzcreative.design
                  </a>
                </div>
              </div>
              <div className="col-md-4 md-mb-24">
                <div className="box-contact-item text-center effectFade fadeUp" data-delay="0.1">
                  <i className="icon icon-headset-solid"></i>
                  <h6 className="title fw-semibold">Phone number</h6>
                  <a href="tel:+4407378562333" className="text" onMouseEnter={playHover}>
                    +44 (0) 7378562333
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box-contact-item text-center effectFade fadeUp" data-delay="0.2">
                  <i className="icon icon-map-marker-solid"></i>
                  <h6 className="title fw-semibold">Our Location</h6>
                  <p className="text-body-1 fw-semibold text-secondary">
                    United Kingdom, Company Number # 14391900
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 lg-mb-24">
                <div className="col-left p-0">
                  <div className="mb-24">
                    <div className="heading-section mb-48">
                      <div className="heading-sub fw-semibold effectFade fadeUp">Contact</div>
                      <div className="heading-title text-gradient-3 effectFade fadeRotateX">
                        Let’s Build <br /> Intelligent Things
                      </div>
                    </div>
                    <p className="text effectFade fadeUp">combining creativity, technology, and strategy to craft solutions that think, adapt, and inspire. Connect with us to turn visionary ideas into meaningful, data-driven realities.</p>
                  </div>
                  <div className="tf-social-1 gap-24 effectFade fadeRotateX">
                    <a href="https://x.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold" onMouseEnter={playHover}>
                      Twitter / X
                      <div className="social-item">
                        <i className="icon icon-twitter-x"></i>
                      </div>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold" onMouseEnter={playHover}>
                      Facebook
                      <div className="social-item">
                        <i className="icon icon-facebook-f"></i>
                      </div>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-body-1 fw-semibold" onMouseEnter={playHover}>
                      Instagram
                      <div className="social-item">
                        <i className="icon icon-instagram"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="form-contact m-0 effectFade fadeUp" onSubmit={handleSubmit} noValidate>
                  <h4 className="heading fw-semibold">Fill this form below</h4>
                  <fieldset className="mb-21">
                    <label className="fw-semibold text-body-3 mb-20">Your Name</label>
                    <input type="text" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} onMouseEnter={playHover} required />
                    {errors.name && <div className="contact-field-error">{errors.name}</div>}
                  </fieldset>
                  <fieldset className="mb-21">
                    <label className="fw-semibold text-body-3 mb-20">Your Phone</label>
                    <input type="text" name="phone" placeholder="Enter the e-mail" value={form.phone} onChange={handleChange} onMouseEnter={playHover} required />
                    {errors.phone && <div className="contact-field-error">{errors.phone}</div>}
                  </fieldset>
                  <fieldset className="mb-18">
                    <label className="fw-semibold text-body-3 mb-0">More About The Project</label>
                    <textarea name="message" value={form.message} onChange={handleChange} onMouseEnter={playHover}></textarea>
                    {errors.message && <div className="contact-field-error">{errors.message}</div>}
                  </fieldset>
                  <div className="attachment d-flex gap-8 align-items-center" onClick={playClick} onMouseEnter={playHover} style={{cursor: 'pointer'}}>
                    <i className="icon icon-paperclip-solid fs-24"></i>
                    <div className="fw-semibold text-body-3">Add an Attachment</div>
                  </div>
                  <button type="submit" className="tf-btn w-100" disabled={submitting} onMouseEnter={playHover}>
                    {submitting ? 'Sending...' : 'Submit Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /section-contact */}

      {/* map */}
      <div className="wg-map">
        <iframe
          title="Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d317859.6089702069!2d-0.075949!3d51.508112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760349331f38dd%3A0xa8bf49dde1d56467!2sTower%20of%20London!5e0!3m2!1sen!2sus!4v1719221598456!5m2!1sen!2sus"
          height="660" style={{ border: 0, width: '100%' }} allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      {/* /map */}

      {/* section-faqs */}
      <FAQs className="" />
      {/* /section-faqs */}
      
      <style>{`
        .contact-field-error {
          margin-top: 8px;
          color: #ff7aa8;
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default ContactPage;
