import { useRef, useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

const TESTIMONIALS = [
  {
    type: 'stars',
    text: 'FanzCreative completely revolutionized our digital presence. Within just three weeks, they delivered a stunning brand identity and a high-performance web platform that truly captures our vision. The results speak for themselves: our inbound client inquiries doubled in less than a month and user engagement is at an all-time high.',
    name: 'Elena Ruiz',
    role: 'CEO, Bloom Studio',
    img: '/assets/images/section/Elena-Ruiz.jpg',
    imgPosition: 'center 35%'
  },
  {
    type: 'quote',
    text: "Working with the FanzCreative team was a game-changer for our e-commerce business. The bespoke platform they designed is exceptionally fast, visually captivating, and optimized for conversions. Since launch, our conversion rate has climbed by 34%, and our customer feedback has been overwhelmingly positive. Simply the best investment we've made this year.",
    name: 'Marcus Tan',
    role: 'Founder, Northway Retail',
    img: '/assets/images/section/Marcus-Tan.png',
    imgPosition: 'center 15%'
  },
  {
    type: 'quote',
    text: 'Their digital marketing assets and 3D motion graphics brought our flagship product launch to life. The interactive storytelling and high-quality explainer videos they created generated over 100k views on day one and significantly boosted our sign-ups. Their attention to detail and creative execution exceeded all our expectations.',
    name: 'David Kim',
    role: 'Marketing Director, PulseWave',
    img: '/assets/images/section/David-Kim.jpg',
    imgPosition: 'center 15%'
  },
];

function Testimonials() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[active];

  return (
    <div className="section-testimonials flat-spacing pt-0" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-between">

          {/* Left — quote content */}
          <div className="col-lg-5">
            <div className="col-left">
              <div className="heading-section mb-48">
                <div className="heading-sub fw-semibold style-1 effectFade fadeUp">Testimonials</div>
                <div className="heading-title text-white effectFade fadeRotateX">
                  What Our <br /> Clients Says
                </div>
              </div>

              <div className="swiper-testimonial_wrap effectFade fadeUp">
                {/* Icon */}
                <div className="top-icon d-flex gap-4">
                  {t.type === 'stars' ? (
                    [...Array(5)].map((_, i) => (
                      <i key={i} className="icon icon-star-solid"></i>
                    ))
                  ) : (
                    <QuoteIcon />
                  )}
                </div>

                {/* Quote text */}
                <div className="text-body-1 text-white desc" style={{ margin: '16px 0' }}>
                  {t.text}
                </div>

                {/* Cite */}
                <div className="cite">
                  <img className="line-left" src="/assets/images/item/line-1.png" alt="" />
                  <div className="name text-body-3 text-neutral-400 fw-semibold">{t.name}</div>
                  <div className="line"></div>
                  <div className="sub text-body-3 text-neutral-400">{t.role}</div>
                </div>

                {/* Nav + dots */}
                <div className="group-slider" style={{ marginTop: 24 }}>
                  <div className="group-btn-slider">
                    <div className="btn-slider nav-prev-swiper" role="button" onClick={prev}>
                      <i className="icon icon-angle-left-solid"></i>
                    </div>
                    <div className="btn-slider nav-next-swiper" role="button" onClick={next}>
                      <i className="icon icon-angle-right-solid"></i>
                    </div>
                  </div>
                  <div className="testimonials-pagination d-flex gap-8" style={{ marginTop: 12 }}>
                    {TESTIMONIALS.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setActive(i)}
                        style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: i === active ? '#fff' : 'rgba(255,255,255,0.3)',
                          cursor: 'pointer', transition: 'background 0.3s',
                          display: 'inline-block',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div className="col-lg-6">
            <div className="effectFade fadeUp">
              <div className="testimonial-image">
                <img
                  src={t.img}
                  alt={t.name}
                  style={{ 
                    transition: 'opacity 0.3s ease', 
                    width: '100%',
                    objectPosition: t.imgPosition || 'center center'
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg width="23" height="20" viewBox="0 0 23 20" fill="none">
      <path d="M12.9375 20V10.3597C12.9375 7.72182 13.824 5.51559 15.5969 3.74101C17.4177 1.91847 19.8854 0.671463 23 0V6.40288C21.8021 6.78657 21.0115 7.26619 20.6281 7.84173C20.2448 8.3693 20.0292 9.04077 19.9813 9.85612H23V20H12.9375ZM0 20V10.3597C0 7.72182 0.886459 5.51559 2.65938 3.74101C4.48021 1.91847 6.94792 0.671463 10.0625 0V6.40288C8.9125 6.78657 8.12187 7.26619 7.69062 7.84173C7.30729 8.3693 7.09167 9.04077 7.04375 9.85612H10.0625V20H0Z" fill="#df2d6d" />
    </svg>
  );
}

export default Testimonials;
