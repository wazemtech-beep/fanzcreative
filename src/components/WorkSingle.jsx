import { useRef, useEffect } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';
import Testimonials from './Testimonials';
import { MouseFollowImage } from './FeaturedWorks';
import { playHover } from '../hooks/useSound';
import { SLUGS } from '../App';

const PROJECT_DATA = [
  {
    title: "Cora Beauty",
    title2: "Skincare Store",
    tagline: "A luxury skincare and cosmetics e-commerce storefront designed to showcase clean, organic beauty products.",
    image: "/assets/images/section/cora-beauty-ecommerce-mockup.jpg",
    details: "Cora Beauty is a premium skincare and cosmetics storefront designed to capture a clean, organic visual language. The brand emphasizes age-defying botanical formulations, clinical-grade skin health ingredients, and sustainable product design. The interface centers on soft tones, modern serif typography, and tactile visuals. The user experience is optimized to guide users from educational ingredient breakdowns to shopping collections with single-click purchases.",
    detailsContinued: "We designed a full design system including responsive landing pages, mobile shopping layouts, custom product displays, and stationary packaging mockups. In-depth research of skincare customer habits helped us design a frictionless product-comparison grid and a subscription funnel that makes re-ordering essential items incredibly easy.",
    deliverables: ["UI/UX Design", "E-commerce Storefront", "Brand Identity"],
    industry: "Skincare & Beauty",
    research: "Our research showed that customers hesitate to buy skincare online without understanding active ingredients and compatibility. We created an interactive 'Skin Advisor' quiz that maps user skin concerns to specific product bundles. Additionally, we optimized high-resolution close-ups of product textures and formulas to bridge the gap between retail stores and online shopping.",
    results: "Within three months of launch, Cora Beauty experienced a 45% lift in subscription registrations and a 28% reduction in check-out bounce rates. Influencer campaigns backed by the premium brand assets led to viral social engagement, establishing the brand as a leader in clean cosmetics.",
    nextProjectIndex: 1,
    nextProjectTitle: "Revolution Fashion Store",
    nextProjectDesc: "A bold, dynamic e-commerce experience for a fast-fashion apparel brand, featuring interactive lookbooks and an optimized quick-cart system.",
    nextProjectDeliverables: "UI/UX Design, E-commerce Platform, Web Development",
    nextProjectIndustry: "Fashion & Retail",
    nextProjectImage: "/assets/images/section/revolution-fashion-store-mockup.jpg"
  },
  {
    title: "Revolution",
    title2: "Fashion Store",
    tagline: "A bold, dynamic e-commerce experience for a fast-fashion apparel brand.",
    image: "/assets/images/section/revolution-fashion-store-mockup.jpg",
    details: "Revolution is a high-performance fashion and apparel store designed to handle large retail catalogs while maintaining a fast, visual storefront. The design centers on high-contrast black-and-white grids, bold styling, and video lookbooks. It features an interactive grid where customers can preview models wearing clothing lines in real-time, select colors, and add items directly to a quick-access cart.",
    detailsContinued: "The website uses code splitting and lazy loading to maintain fast load times on mobile, ensuring seamless browsing during seasonal drops. The shopping checkout was customized to support multi-currency checkouts and express payment options, reducing friction for fashion-forward buyers worldwide.",
    deliverables: ["UI/UX Design", "E-commerce Platform", "Web Development"],
    industry: "Fashion & Retail",
    research: "We analyzed user behavior during high-traffic clothing drops and found that slow load times and confusing sizing grids accounted for 40% of abandoned purchases. We simplified the checkout steps and added a visual size guide based on model dimensions, enabling users to shop confidently in seconds.",
    results: "Following launch, Revolution saw a 38% increase in mobile conversions and a 50% decrease in sizing-related product returns. Sizing assistance tools and fast checkouts elevated customer satisfaction and boosted lifetime customer value.",
    nextProjectIndex: 2,
    nextProjectTitle: "Marble Fashion E-commerce",
    nextProjectDesc: "An editorial-driven digital storefront for an upscale clothing collection, emphasizing high-resolution photography and custom grids.",
    nextProjectDeliverables: "UI/UX Design, Webflow Development, Motion Design",
    nextProjectIndustry: "Luxury Fashion",
    nextProjectImage: "/assets/images/section/marble-fashion-ecommerce-mockup.jpg"
  },
  {
    title: "Marble",
    title2: "Fashion E-commerce",
    tagline: "An editorial-driven digital storefront for an upscale clothing collection.",
    image: "/assets/images/section/marble-fashion-ecommerce-mockup.jpg",
    details: "Marble is a premium digital experience created for a fashion e-commerce storefront looking to establish a strong storytelling narrative online. The visual theme uses elegant editorial layouts, large-format imagery, and micro-interactions. The interface presents clothing collections like an art gallery, inviting customers to explore fabric sources, designer interviews, and styling tips.",
    detailsContinued: "We built the site around optimized interactive grids that showcase fabric details under zoom. Smooth transitions and custom loading animations enhance the premium feel of the brand. This project demonstrates how e-commerce can transcend simple product listings to build brand prestige and customer desire.",
    deliverables: ["UI/UX Design", "Webflow Development", "Motion Design"],
    industry: "Luxury Fashion",
    research: "We studied luxury consumer expectations and found that storytelling, styling guidance, and visual authenticity are key to justifying luxury price points. We designed custom editorial guides and integrated video loops showing clothing movement to convey texture, fit, and silhouette visually.",
    results: "The digital launch generated significant press coverage and saw a 34% increase in Average Order Value (AOV). Customers spent 50% more time on the platform exploring brand collection stories, resulting in strong brand loyalty and repeat purchases.",
    nextProjectIndex: 3,
    nextProjectTitle: "Mojave Clothing Store",
    nextProjectDesc: "Minimal and functional e-commerce design highlighting sustainable outerwear fabric narratives and optimized mobile checkouts.",
    nextProjectDeliverables: "Shopify Development, UI Design, Brand Storytelling",
    nextProjectIndustry: "Apparel & Outerwear",
    nextProjectImage: "/assets/images/section/mojave-clothing-store-mockup.jpg"
  },
  {
    title: "Mojave",
    title2: "Clothing Store",
    tagline: "Minimal and functional e-commerce design highlighting sustainable outerwear fabric narratives.",
    image: "/assets/images/section/mojave-clothing-store-mockup.jpg",
    details: "Mojave is a highly functional storefront designed for an outerwear and everyday essentials brand. Built with Shopify, the storefront focuses on sustainability storytelling, showing the lifecycle of organic materials and outerwear construction. The interface is clean and minimalist, allowing product photography and textile close-ups to stand out.",
    detailsContinued: "We optimized mobile checkouts, shipping calculators, and lazy-loading grids. The site includes sustainable material icons, detail cards, and customer reviews linked directly to sizing data to help customers choose outerwear that fits correctly.",
    deliverables: ["Shopify Development", "UI Design", "Brand Storytelling"],
    industry: "Apparel & Outerwear",
    research: "Outerwear purchases require a high level of trust regarding warmth, durability, and weather resistance. We added structured charts illustrating wind resistance, water-proofing, and temperature ranges for each piece. This helped customers make informed decisions directly on the product detail page.",
    results: "Following launch, Mojave experienced a 34% increase in conversions and a 25% lift in average order value. The sustainable narrative resonated deeply with customers, boosting returning customer rates and overall search rankings.",
    nextProjectIndex: 0,
    nextProjectTitle: "Cora Beauty Skincare Store",
    nextProjectDesc: "A luxury skincare and cosmetics e-commerce storefront showcasing clean, organic beauty products and optimized conversion funnels.",
    nextProjectDeliverables: "UI/UX Design, E-commerce Storefront, Brand Identity",
    nextProjectIndustry: "Skincare & Beauty",
    nextProjectImage: "/assets/images/section/cora-beauty-ecommerce-mockup.jpg"
  }
];

function WorkSingle({ projectIndex = 0 }) {
  const rootRef = useRef(null);
  useScrollFade(rootRef);

  const project = PROJECT_DATA[projectIndex] || PROJECT_DATA[0];

  return (
    <div ref={rootRef}>
      {/* Hero Banner */}
      <div className="section-hero v2">
        <div className="hero-image"></div>
        <div className="container">
          <div className="content-wrap text-center">
            <div className="title text-display-2 effectFade fadeRotateX" key={projectIndex}>
              <span className="title1 fw-semibold text-gradient-1">{project.title}</span>
              <br />
              <div className="title2 d-flex gap-20 justify-content-center flex-wrap">
                <span className="fw-semibold text-gradient-1">{project.title2}</span>
                  <div className="title-icon">
                    <div className="box"></div>
                    <div className="hero-shape-flight-zone-v2" aria-hidden="true">
                      <div className="hero-falling-shape-v2 shape-1">
                        <img src="/assets/images/item/hero-1.svg" alt="" />
                        <img src="/assets/images/item/hero-1.svg" alt="" className="cloned" />
                      </div>
                      <div className="hero-falling-shape-v2 shape-2">
                        <img src="/assets/images/item/hero-2.svg" alt="" />
                        <img src="/assets/images/item/hero-2.svg" alt="" className="cloned" />
                      </div>
                      <div className="hero-falling-shape-v2 shape-3">
                        <img src="/assets/images/item/hero-3.svg" alt="" />
                        <img src="/assets/images/item/hero-3.svg" alt="" className="cloned" />
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <p className="text effectFade fadeUp">
              {project.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* section-work-single */}
      <div id="works" className="section-work-single flat-spacing pt-0">
        <div className="container">
          <div className="row mb-32">
            <div className="col-12">
              <div className="wrap-image mb-60 effectFade fadeZoom" key={`img-1-${projectIndex}`}>
                <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto' }} />
              </div>
              <h2 className="heading fw-semibold mb-32 effectFade fadeUp">Project Details</h2>
              <p className="text-secondary effectFade fadeUp">
                {project.details}
                <br /><br />
                {project.detailsContinued}
              </p>
            </div>
          </div>
          <div className="row mb-60">
            <div className="col-md-8 md-mb-24">
              <div className="text-body-1 fw-semibold text-secondary mb-15 effectFade fadeUp">
                DELIVERABLES
              </div>
              <div className="list-tags effectFade fadeUp">
                {project.deliverables.map((item, idx) => (
                  <a key={idx} href="#" className="tags-item fw-semibold" onClick={(e) => e.preventDefault()}>{item}</a>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-body-1 fw-semibold text-secondary mb-15 effectFade fadeUp" data-delay={0.1}>
                INDUSTRY
              </div>
              <div className="list-tags effectFade fadeUp" data-delay={0.1}>
                <a href="#" className="tags-item fw-semibold" onClick={(e) => e.preventDefault()}>{project.industry}</a>
              </div>
            </div>
          </div>
          <div className="row mb-60">
            <div className="col-12">
              <div className="wrap-image effectFade fadeZoom" key={`img-2-${projectIndex}`}>
                <img src="/assets/images/section/work-single-2.jpg" alt="" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
          <div className="row mb-60">
            <div className="col-12">
              <h2 className="heading fw-semibold mb-20 effectFade fadeUp">Project Research</h2>
              <p className="text-secondary effectFade fadeUp">
                {project.research}
              </p>
            </div>
          </div>
          <div className="row mb-60">
            <div className="col-12">
              <h2 className="heading fw-semibold mb-20 effectFade fadeUp">Project Results</h2>
              <p className="text-secondary effectFade fadeUp">
                {project.results}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 md-mb-24">
              <div className="image effectFade fadeUp">
                <img src="/assets/images/section/work-single-3.jpg" alt="" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="image effectFade fadeUp" data-delay={0.1}>
                <img src="/assets/images/section/work-single-4.jpg" alt="" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials block */}
      <div className="box-black">
        <div className="light-box"></div>
        <img className="light-top" src="/assets/images/item/light-top.webp" alt="" />
        <img className="light-bot" src="/assets/images/item/light-bot.webp" alt="" style={{ display: 'block', marginBottom: '-4px' }} />
        <Testimonials />
      </div>

      {/* Next Project Section */}
      <div className="section-featured-works flat-spacing">
        <div className="container">
          <div className="heading-section center mb-64">
            <div className="heading-sub fw-semibold effectFade fadeUp">Project</div>
            <div className="heading-title text-gradient-3 effectFade fadeRotateX" key={`next-${projectIndex}`}>Next Project</div>
          </div>
          <div className="featured-works-list position-relative">
            <div className="element effectFade fadeUp" key={`next-card-${projectIndex}`}>
              <div className="featured-works-item" onMouseEnter={playHover}>
                <MouseFollowImage
                  src={project.nextProjectImage}
                  alt={project.nextProjectTitle}
                  href={`/project/${SLUGS[project.nextProjectIndex]}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.setCurrentPage) {
                      window.setCurrentPage('work-single', project.nextProjectIndex);
                    }
                  }}
                />
                <div className="content">
                  <div className="pagi-dot">
                    {[0, 1, 2, 3].map((d) => (
                      <span key={d} className={d === project.nextProjectIndex ? 'active' : ''}></span>
                    ))}
                  </div>
                  <div className="bot">
                    <h4 className="heading fw-semibold">
                      {project.nextProjectTitle.split(' ')[0]} <br /> {project.nextProjectTitle.split(' ').slice(1).join(' ')}
                    </h4>
                    <div className="grid-text">
                      <div className="item">
                        <div className="title text-secondary">DESCRIPTION</div>
                        <div className="text-body-3 fw-semibold">{project.nextProjectDesc}</div>
                      </div>
                      <div className="item">
                        <div className="title text-secondary">DELIVERABLES</div>
                        <div className="fw-semibold text-body-3">{project.nextProjectDeliverables}</div>
                      </div>
                      <div className="item">
                        <div className="title text-secondary">INDUSTRY</div>
                        <div className="fw-semibold text-body-3">{project.nextProjectIndustry}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .section-hero.v2 .content-wrap .title-icon {
          position: relative;
          z-index: 1;
        }

        .section-hero.v2 .content-wrap .title-icon .box {
          position: relative;
          z-index: 2;
        }

        .hero-shape-flight-zone-v2 {
          position: absolute;
          z-index: 3;
          top: 0;
          left: 0;
          width: 255px;
          height: 400px;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-falling-shape-v2 {
          position: absolute;
          will-change: transform;
          animation: heroShapeFallV2 6.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        .hero-falling-shape-v2 img {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          max-width: none;
        }

        /* Static rotations and scales for each shape channel to keep animation path straight */
        .hero-falling-shape-v2.shape-1 img {
          transform: rotate(-8deg) scale(0.92);
        }
        .hero-falling-shape-v2.shape-1 img.cloned {
          transform: translateY(-400px) rotate(-8deg) scale(0.92);
        }

        .hero-falling-shape-v2.shape-2 img {
          transform: rotate(8deg) scale(1);
        }
        .hero-falling-shape-v2.shape-2 img.cloned {
          transform: translateY(-400px) rotate(8deg) scale(1);
        }

        .hero-falling-shape-v2.shape-3 img {
          transform: rotate(-5deg) scale(0.94);
        }
        .hero-falling-shape-v2.shape-3 img.cloned {
          transform: translateY(-400px) rotate(-5deg) scale(0.94);
        }

        .hero-falling-shape-v2.shape-1 {
          top: -8px;
          left: 49px;
          animation-delay: 0s;
        }

        .hero-falling-shape-v2.shape-2 {
          top: 22px;
          left: 136px;
          animation-delay: -2.2s;
        }

        .hero-falling-shape-v2.shape-3 {
          top: 48px;
          left: 66px;
          animation-delay: -4.4s;
        }

        .section-hero.v2 .content-wrap .text {
          position: relative;
          z-index: 4;
        }

        .section-work-single {
          position: relative;
          z-index: 5;
        }

        @keyframes heroShapeFallV2 {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, 400px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-falling-shape-v2 {
            animation: none;
          }
        }

        @media (max-width: 767px) {
          .hero-falling-shape-v2 {
            animation-duration: 7.2s;
          }
        }
      `}</style>
    </div>
  );
}

export default WorkSingle;
