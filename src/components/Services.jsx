import { useRef, useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';
import Waves from './Waves';
import { playSwoosh, playTap, playHover } from '../hooks/useSound';

/**
 * Services — converted from `#services .section-services` in index-v2.html
 *
 * The original used Bootstrap collapse + a jQuery `services_btn` handler
 * that swaps the side image when an accordion row is clicked.
 *
 * Replaced with local React state:
 *  - `activeId` tracks which accordion item is open
 *  - The side image fades to the new src via CSS transition (opacity toggle)
 *  - No Bootstrap JS / jQuery needed
 */

const SERVICE_ITEMS = [
  {
    id: 1,
    title: 'Web\nDesign',
    img: '/assets/images/item/service-web-design.webp',
    desc: 'Elevate your digital presence with a beautifully crafted website design.',
    tags: ['Concept', 'User flow', 'Wireframe', 'UI Design', 'Ux Design', 'Design Guidelines'],
  },
  {
    id: 2,
    title: 'Branding',
    img: '/assets/images/item/service-branding.webp',
    desc: 'Your brand design is your business\'s first impression — make it count.',
    tags: ['Logo Design', 'Brand Identity', 'Social media kit', 'Stationery Items', 'Presentation Design', 'Packaging Design'],
  },
  {
    id: 3,
    title: 'Motion\nDesign',
    img: '/assets/images/item/service-motion-design.gif',
    desc: 'Motion graphics are a great way to add visual interest to your brand design.',
    tags: ['2d Animation', '3d Animation', 'Logo Animation', 'White Board Animation', 'Animate Your Presentations', 'Create Product Explainers'],
  },
  {
    id: 4,
    title: 'Website\nDevelopment',
    img: '/assets/images/item/service-web-dev.webp',
    desc: 'From concept to reality, we bring your website to life.',
    tags: ['HTML', 'WordPress', 'Wix', 'Shopify', 'Squarespace', 'WooCommerce'],
  },
];

function Services() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  const [activeId, setActiveId] = useState(1);
  const [imgVisible, setImgVisible] = useState(true);

  const activeItem = SERVICE_ITEMS.find((s) => s.id === activeId);

  const handleAccordionClick = (id) => {
    if (id === activeId) return;
    /* Fade out → swap → fade in */
    setImgVisible(false);
    setTimeout(() => {
      setActiveId(id);
      setImgVisible(true);
    }, 200);
  };

  return (
    <div id="services" className="section-services flat-spacing" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Waves — absolutely behind everything, z-index 0 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Waves
          lineColor="rgba(233, 30, 140, 0.18)"
          backgroundColor="transparent"
          waveSpeedX={0.008}
          waveSpeedY={0.004}
          waveAmpX={28}
          waveAmpY={12}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* All content above the wave canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="row justify-content-between">

            {/* Left: heading + description */}
            <div className="col-xxl-4 col-lg-6">
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="col-left">
                  <div className="heading-section mb-48">
                    <div className="heading-sub fw-semibold effectFade fadeUp">Services</div>
                    <div className="heading-title text-gradient-3 effectFade fadeRotateX">
                      End-to-End <br /> Creative Services
                    </div>
                  </div>
                  <p className="effectFade fadeUp">
                    From brand identity to fully built websites — we cover every layer of the
                    digital experience with design, motion, and development.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: accordion list */}
            <div className="col-xxl-6 col-lg-6">
              <div className="accordion-faq_list">
                {SERVICE_ITEMS.map((item, index) => {
                  const isOpen = item.id === activeId;
                  const num = String(index + 1).padStart(2, '0');
                  /* Preserve line-breaks in title */
                  const titleLines = item.title.split('\n');

                  return (
                    <div
                      key={item.id}
                      className="accordion-faq_item effectFade fadeUp"
                      role="presentation"
                      style={{ borderRadius: '40px', overflow: 'hidden' }}
                    >
                      {/* Accordion trigger */}
                      <div
                        className={`accordion-action services-image-btn${isOpen ? ' active-img' : ' collapsed'}`}
                        role="button"
                        aria-expanded={isOpen}
                        onClick={() => { handleAccordionClick(item.id); playSwoosh(); }}
                        onMouseEnter={playHover}
                      >
                        <div className="accordion-title">
                          {titleLines[0]} <br /> {titleLines[1]}
                          <div className="text-body-1 num">({num})</div>
                        </div>
                      </div>

                      {/* Accordion body */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateRows: isOpen ? '1fr' : '0fr',
                          transition: 'grid-template-rows 0.4s ease',
                        }}
                      >
                        <div style={{ overflow: 'hidden' }}>
                          <div className="accordion-content">
                            <div className="text-body-3 text-neutral-300 text">{item.desc}</div>
                            <div className="list-tags">
                              {item.tags.map((tag) => (
                                <a key={tag} href="#" className="tags-item fw-semibold" onClick={playTap} onMouseEnter={playHover}>
                                  {tag}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Side image (swaps on accordion change) */}
            <div className="services-image effectFade fadeUp">
              <img loading="lazy"
                src={activeItem.img}
                alt=""
                style={{
                  opacity: imgVisible ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              />
            </div>

          </div>
        </div>{/* end container */}
      </div>{/* end content wrapper */}
    </div>
  );
}

export default Services;
