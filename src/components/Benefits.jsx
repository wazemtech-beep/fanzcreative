import { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

const PROGRESS_ITEMS = [
  { icon: 'icon-star-solid', label: 'Design Quality', value: 95 },
  { icon: 'icon-clock-solid', label: 'On-Time Delivery', value: 98 },
  { icon: 'icon-heart-solid', label: 'Client Satisfaction', value: 100 },
  { icon: 'icon-chart-line-solid', label: 'Brand Impact', value: 85 },
];

const DURATION = 1800; // ms

/**
 * SyncedProgressItem
 * Label physically follows the leading edge of the progress bar.
 * Both the bar width and the label's `left` position are driven
 * by the same rAF loop so they are always perfectly in sync.
 */
function SyncedProgressItem({ icon, label, value }) {
  const fillRef    = useRef(null); // pink fill bar (label lives inside)
  const startedRef = useRef(false);

  const runAnimation = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const fill = fillRef.current;
    if (!fill) return;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed    = now - startTime;
      const progress   = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased      = 1 - Math.pow(1 - progress, 3);
      const currentPct = eased * value;

      // Grow the pink fill — label inside moves with it automatically
      fill.style.width = currentPct + '%';

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        fill.style.width = value + '%';
      }
    };

    requestAnimationFrame(tick);
  }, [value]);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    fill.style.width = '0%';

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { runAnimation(); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(fill);
    return () => observer.disconnect();
  }, [runAnimation]);

  return (
    <div className="benefits-progress-item" style={{ marginTop: '16px' }}>
      <div style={{ position: 'relative', flex: 1, marginRight: 12 }}>

        {/* Pink fill bar — label sits INSIDE at the right edge */}
        <div
          ref={fillRef}
          className="progress-line"
          style={{ width: '0%', position: 'relative', overflow: 'visible' }}
        >
          {/* Label: absolutely pinned to the right end of the fill */}
          <span
            style={{
              position      : 'absolute',
              right         : 0,
              top           : '50%',
              transform     : 'translate(50%, -50%)',
              fontSize      : '13px',
              fontWeight    : '800',
              color         : '#df2d6d',
              background    : 'var(--white, #fff)',
              border        : '2px solid #df2d6d',
              borderRadius  : '20px',
              padding       : '2px 8px',
              whiteSpace    : 'nowrap',
              pointerEvents : 'none',
              zIndex        : 6,
              lineHeight    : 1.4,
              boxShadow     : '0 2px 8px rgba(223,45,109,0.18)',
            }}
          >{value}%</span>
        </div>
      </div>

      <div className="progress-text fw-semibold">
        <i className={`icon ${icon}`}></i>
        {label}
      </div>
    </div>
  );
}

function Benefits() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

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
                  <SyncedProgressItem key={item.label} {...item} />
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

          <div className="col-lg-7">
            <div className="benefits-box benefits-design">
              <div className="benefits-design-inner">
                <img className="item-img-1" src="/assets/images/item/benefits-2.svg" alt="" />
                <img className="item-img-2 rightleft" src="/assets/images/item/benefits-3.svg" alt="" />
                <img className="item-img-3 updown" src="/assets/images/item/benefits-4.svg" alt="" />
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
