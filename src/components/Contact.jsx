import { useRef, useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';
import Orb from './Orb';

function Contact() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Wire to your backend / email service here */
    alert('Message sent!');
  };

  return (
    <div id="contact" className="flat-spacing pt-0" ref={sectionRef}>
      <div className="section-contact">
        {/* Background animation wrapper */}
        <div className="contact-image" style={{ background: '#000000', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.65 }}>
            <Orb hue={0} hoverIntensity={0.3} rotateOnHover={true} forceHoverState={false} backgroundColor="#000000" />
          </div>
        </div>

        <div className="container">
          <div className="row">

            {/* Left — info */}
            <div className="col-lg-6">
              <div className="col-left" style={{ position: 'relative', zIndex: 2 }}>
                <div className="heading-section mb-48">
                  <div className="heading-sub fw-semibold text-black effectFade fadeUp" style={{ color: '#000000' }}>Contact</div>
                  <div className="heading-title text-white effectFade fadeRotateX" style={{ paddingBottom: '15px' }}>
                    Let's Build <br /> Intelligent Things
                  </div>
                </div>
                <div>
                  <div className="contact-item mb-20 effectFade fadeRotateX">
                    <i className="icon icon-envelope-solid" style={{ color: '#000000' }}></i>
                    <div className="content">
                      <div className="title text-white fw-semibold mb-2">E-mail address</div>
                      <div className="text text-neutral-300">hello@youraiagency.com</div>
                    </div>
                  </div>
                  <div className="contact-item effectFade fadeRotateX" data-delay="0.1">
                    <i className="icon icon-headset-solid" style={{ color: '#000000' }}></i>
                    <div className="content">
                      <div className="title text-white fw-semibold mb-2">Phone number</div>
                      <div className="text text-neutral-300">+1 (647) 555 0172</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="col-lg-6">
              <form
                className="form-contact effectFade fadeUp"
                onSubmit={handleSubmit}
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                  color: '#ffffff',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <h4 className="heading fw-semibold text-white">Fill this form below</h4>

                <fieldset className="mb-21">
                  <label className="fw-semibold text-white text-body-3 mb-20">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{
                      color: '#ffffff',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                </fieldset>

                <fieldset className="mb-21">
                  <label className="fw-semibold text-white text-body-3 mb-20">Your Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter the e-mail"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={{
                      color: '#ffffff',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                </fieldset>

                <fieldset className="mb-18">
                  <label className="fw-semibold text-white text-body-3 mb-0">More About The Project</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    style={{
                      color: '#ffffff',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  ></textarea>
                </fieldset>

                <div className="attachment d-flex gap-8 align-items-center" style={{ color: '#ffffff' }}>
                  <i className="icon icon-paperclip-solid fs-24"></i>
                  <div className="fw-semibold text-body-3">Add an Attachment</div>
                </div>

                <button type="submit" className="tf-btn w-100">Submit Message</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
