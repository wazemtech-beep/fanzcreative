import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useScrollFade } from '../hooks/useScrollFade';
import Contact from '../components/Contact';

const BLOG_POSTS = [
  {
    id: 1,
    slug: 'future-of-ui-ux',
    title: 'The Future of UI/UX in E-Commerce',
    excerpt: 'Discover how emerging design trends and smart automation are redefining the way customers interact with online stores.',
    date: 'Oct 15, 2026',
    category: 'Design',
    img: '/assets/images/blog/blog_ui_ux.png'
  },
  {
    id: 2,
    slug: 'ai-automation-game-changer',
    title: 'Why AI Automation is a Game Changer',
    excerpt: 'Learn how integrating artificial intelligence into your daily workflows can save thousands of hours and boost revenue.',
    date: 'Sep 28, 2026',
    category: 'Technology',
    img: '/assets/images/blog/blog_ai_automation.png'
  },
  {
    id: 3,
    slug: 'scalable-web-platforms',
    title: 'Building Scalable Web Platforms',
    excerpt: 'A deep dive into modern web development practices, focusing on performance, accessibility, and robust architecture.',
    date: 'Sep 10, 2026',
    category: 'Development',
    img: '/assets/images/blog/blog_web_dev.png'
  }
];

function BlogPage() {
  const pageRef = useRef(null);
  useScrollFade(pageRef);

  return (
    <div ref={pageRef} className="blog-page-wrapper">
      <Helmet>
        <title>Blog - FanzCreative</title>
      </Helmet>

      {/* page-title */}
      <div className="section-page-title">
        <div className="container text-center">
          <h1 className="page-title fw-semibold effectFade fadeZoom">FanzCreative</h1>
          <div className="breadcrumbs effectFade fadeUp">
            <Link to="/" className="link1">Home</Link>
            <div>/</div>
            <div>Blog</div>
          </div>
        </div>
      </div>
      {/* /page-title */}

      {/* Blog Grid 2 */}
      <section className="section-blog flat-spacing">
        <div className="container">
          <div className="tf-grid-layout sm-col-2">
            {BLOG_POSTS.map((post, i) => (
              <div key={post.id} className="article-blog hover-img effectFade fadeUp no-div" data-delay={(i * 0.1).toString()}>
                <Link to={`/blog/single/${post.slug}`} className="blog-image img-style">
                  <img loading="lazy" width="426" height="307" src={post.img} alt={post.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </Link>
                <div className="blog-content">
                  <div className="infor">
                    <p className="infor_sub text-secondary">
                      {post.category}
                    </p>
                    <h6 className="fw-semibold">
                      <Link to={`/blog/single/${post.slug}`} className="link1 infor_name">
                        {post.title}
                      </Link>
                    </h6>
                  </div>
                  <Link to={`/blog/single/${post.slug}`} className="tf-btn-2">
                    Read more
                    <i className="icon icon-arrow-top-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* /Blog Grid 2 */}

      <Contact />
    </div>
  );
}

export default BlogPage;
