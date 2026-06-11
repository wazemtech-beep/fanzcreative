import { useRef } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

/**
 * FeaturedWorks — `.section-featured-works` from index-v2.html
 *
 * The original used `.main-mouse-hover` + `.tf-mouse` (jQuery cursor follow).
 * In React we reproduce the hover cursor with a simple CSS approach:
 * the `.view-project` link is absolutely positioned and revealed on hover
 * via CSS (no JS needed — matches original intent visually).
 *
 * `.pagi-dot` animated with the shared GSAP dot() logic is deferred to
 * a later pass; dots render correctly at their static initial states.
 */

const WORKS = [
  {
    img: '/assets/images/section/featured-works-1.jpg',
    activeDot: 0,
    title: 'Bloom Studio\nRebranding',
    desc: 'Complete brand overhaul including logo, colour palette, typography, and social media kit.',
    deliverables: 'Logo Design, Brand Guidelines,\nSocial Media Kit',
    industry: 'Beauty & Wellness',
  },
  {
    img: '/assets/images/section/featured-works-2.jpg',
    activeDot: 1,
    title: 'Northway\nE-commerce Site',
    desc: 'Custom Shopify store with tailored UI/UX — conversion rate improved by 34% post-launch.',
    deliverables: 'UI/UX Design, Shopify Development',
    industry: 'Retail',
  },
  {
    img: '/assets/images/section/featured-works-3.jpg',
    activeDot: 2,
    title: 'PulseWave\nProduct Launch',
    desc: '60-second animated explainer video that generated 50K views in the first week.',
    deliverables: '2D Animation, Motion Graphics',
    industry: 'Tech / SaaS',
  },
  {
    img: '/assets/images/section/featured-works-4.jpg',
    activeDot: 3,
    title: 'Verdant\nPackaging Design',
    desc: 'Eco-friendly packaging system across 12 SKUs — stocked in 3 major retail chains.',
    deliverables: 'Packaging Design, Print-ready Files',
    industry: 'FMCG / Food & Bev',
  },
];

function FeaturedWorks() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  return (
    <div id="works" className="section-featured-works flat-spacing pt-0" ref={sectionRef}>
      <div className="container">
        <div className="heading-section mb-0">
          <div className="heading-sub fw-semibold mx-auto effectFade fadeUp">Featured Works</div>
        </div>

        <div className="featured-works-list position-relative">
          {WORKS.map((work, i) => {
            const titleLines = work.title.split('\n');
            return (
              <div key={i}>
                <div className={`featured-works-item${i === 0 ? ' effectFade fadeUp no-div' : ''}`}>
                  {/* Image + hover overlay */}
                  <div className="image main-mouse-hover">
                    <img src={work.img} alt={work.title.replace('\n', ' ')} />
                    <a href="/work-single" className="tf-mouse view-project h6">
                      View Project
                      <i className="icon icon-arrow-top-right"></i>
                    </a>
                  </div>

                  {/* Content */}
                  <div className="content">
                    {/* Progress dots */}
                    <div className="pagi-dot">
                      {[0, 1, 2, 3].map((d) => (
                        <span key={d} className={d === work.activeDot ? 'active' : ''}></span>
                      ))}
                    </div>

                    <div className="bot">
                      <h4 className="heading fw-semibold">
                        {titleLines[0]} <br /> {titleLines[1]}
                      </h4>
                      <div className="grid-text">
                        <div className="item">
                          <div className="title text-secondary">DESCRIPTION</div>
                          <div className="text-body-3 fw-semibold">{work.desc}</div>
                        </div>
                        <div className="item">
                          <div className="title text-secondary">DELIVERABLES</div>
                          <div className="fw-semibold text-body-3">
                            {work.deliverables.split('\n').map((l, j) => (
                              <span key={j}>{l}{j < work.deliverables.split('\n').length - 1 && <br />}</span>
                            ))}
                          </div>
                        </div>
                        <div className="item">
                          <div className="title text-secondary">INDUSTRY</div>
                          <div className="fw-semibold text-body-3">{work.industry}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturedWorks;
