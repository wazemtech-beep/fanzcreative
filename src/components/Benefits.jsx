import { useRef, useEffect } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

/**
 * Benefits — `.section-benefits` from index-v2.html
 *
 * Progress bars reproduced from gsapAnimation.js → techProgress():
 * each `.progress-line[data-progress]` animates width 15%→N% on scroll.
 * Handled here with IntersectionObserver + CSS transition so no extra
 * GSAP dependency is needed for this section.
 */

const PROGRESS_ITEMS = [
  { icon: 'icon-star-solid',           label: 'Design Quality', value: 100 },
  { icon: 'icon-clock-solid',          label: 'On-Time Delivery', value: 100 },
  { icon: 'icon-heart-solid',          label: 'Client Satisfaction', value: 100 },
  { icon: 'icon-chart-line-solid',     label: 'Brand Impact', value: 100 },
];

function Benefits() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  /* ── Progress bar animation ─────────────────────────────────────── */
  useEffect(() => {
    const lines = sectionRef.current?.querySelectorAll('.progress-line[data-progress]');
    if (!lines?.length) return;

    lines.forEach((el) => {
      el.style.width = '15%';
      el.style.transition = 'width 1.5s cubic-bezier(0.22,1,0.36,1)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.style.width = target.dataset.progress + '%';
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.3 }
    );

    lines.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-benefits flat-spacing pt-0" ref={sectionRef}>
      <div className="container">

        {/* Heading */}
        <div className="heading-section center mb-70">
          <div className="heading-sub fw-semibold effectFade fadeUp">Benefits</div>
          <div className="heading-title text-gradient-3 effectFade fadeRotateX">Why Choose Us</div>
        </div>

        {/* Row 1 */}
        <div className="row mb-24">
          {/* Progress bars box */}
          <div className="col-lg-7">
            <div className="benefits-box benefits-progress">
              <div className="benefits-progress-inner">
                {PROGRESS_ITEMS.map((item) => (
                  <div key={item.label} className="benefits-progress-item">
                    <div className="progress-line" data-progress={item.value}></div>
                    <div className="progress-text fw-semibold">
                      <i className={`icon ${item.icon}`}></i>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="content">
                <h6 className="fw-semibold title">Quality over Quantity</h6>
                <p className="text text-secondary">
                  We obsess over every pixel, colour, and curve — so every deliverable reflects your brand at its absolute best.
                </p>
              </div>
            </div>
          </div>

          {/* Step / checklist box */}
          <div className="col-lg-5">
            <div className="effectFade fadeUp" style={{ padding: '30px', margin: '-30px' }}>
              <div className="benefits-box benefits-step">
                <div className="benefits-step-inner">
                <div className="line-step"></div>
                <div className="step-item"><i className="icon icon-check-solid"></i></div>
                <div className="step-item"><i className="icon icon-check-solid"></i></div>
                <div className="step-item"><i className="icon icon-check-solid"></i></div>
              </div>
              <div className="content">
                <h6 className="fw-semibold title">Deadline-First Commitment</h6>
                <p className="text text-secondary">
                  We build realistic timelines and stick to them. You always know where your project stands — no surprises, ever.
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          {/* Secure box */}
          <div className="col-lg-5">
            <div className="benefits-box benefits-secure">
              <div className="benefits-secure-inner text-center">
                <img src="/assets/images/item/benefits-1.svg" alt="" />
              </div>
              <div className="content">
                <h6 className="fw-semibold title">Brand Consistency</h6>
                <p className="text text-secondary">
                  Every touchpoint — from your logo to your website — stays on-brand, on-message, and unmistakably you.
                </p>
              </div>
            </div>
          </div>

          {/* Design box */}
          <div className="col-lg-7">
            <div className="benefits-box benefits-design">
              <div className="benefits-design-inner">
                <img className="item-img-1" src="/assets/images/item/benefits-2.svg" alt="" />
                <img className="item-img-2 rightleft" src="/assets/images/item/benefits-3.svg" alt="" />
                <img className="item-img-3 updown"    src="/assets/images/item/benefits-4.svg" alt="" />
              </div>
              <div className="content">
                <h6 className="fw-semibold title">Creative That Converts</h6>
                <p className="text text-secondary">
                  Beautiful design is only half the job. We make sure every creative decision serves your business goals and drives real results.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Benefits;
