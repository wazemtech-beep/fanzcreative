import { useRef } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

const TEAM = [
  /* col-left — large card */
  {
    img: '/assets/images/team/team-1.jpg',
    name: 'Ava Collins',
    role: "FanzCreative's Creative Director",
    socials: ['icon-twitter-x', 'icon-linkedin-in', 'icon-github'],
    style: 'main',
    delay: null,
  },
  /* col-center — two stacked style-1 cards */
  {
    img: '/assets/images/team/team-2.jpg',
    name: 'Noah Reed',
    role: 'Senior UI/UX Designer. Crafts intuitive experiences',
    socials: ['icon-github', 'icon-linkedin-in'],
    style: 'style-1',
    delay: null,
    mb: true,
  },
  {
    img: '/assets/images/team/team-3.jpg',
    name: 'Lucas Hayes',
    role: 'Brand Strategist. Builds identities that resonate',
    socials: ['icon-github', 'icon-linkedin-in'],
    style: 'style-1',
    delay: null,
  },
  /* col-right — two stacked style-1 cards */
  {
    img: '/assets/images/team/team-4.jpg',
    name: 'Jordan Brooks',
    role: 'Motion Designer. Animates brands to life',
    socials: ['icon-github', 'icon-linkedin-in'],
    style: 'style-1',
    delay: '0.1',
    mb: true,
  },
  {
    img: '/assets/images/team/team-5.jpg',
    name: 'Erin Park',
    role: 'Web Developer. Turns designs into fast websites',
    socials: ['icon-github', 'icon-linkedin-in'],
    style: 'style-1',
    delay: '0.1',
  },
];

function Team() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  const [main, n2, n3, n4, n5] = TEAM;

  return (
    <div className="section-team flat-spacing" ref={sectionRef}>
      <div className="container">
        <div className="heading-section center mb-64">
          <div className="heading-sub fw-semibold style-1 effectFade fadeUp">Team Members</div>
          <div className="heading-title text-white effectFade fadeRotateX">
            The Team Behind <br /> Your Brand
          </div>
        </div>

        <div className="row justify-content-center">
          {/* Main large card */}
          <div className="col-lg-4 col-md-8 lg-mb-24">
            <div className="team-item h-100 effectFade fadeUp">
              <div className="image">
                <img src={main.img} alt={main.name} />
              </div>
              <a href="#" className="name h6 fw-semibold">{main.name}</a>
              <div className="sub text-body-1">{main.role}</div>
              <div className="tf-social justify-content-center">
                {main.socials.map((ic) => (
                  <a key={ic} href="#" className="social-item">
                    <i className={`icon ${ic}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Center column */}
          <div className="col-lg-4 col-md-6 lg-mb-24">
            <SmallCard member={n2} />
            <SmallCard member={n3} />
          </div>

          {/* Right column */}
          <div className="col-lg-4 col-md-6">
            <SmallCard member={n4} />
            <SmallCard member={n5} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ member }) {
  return (
    <div
      className={`team-item style-1 effectFade fadeUp${member.mb ? ' mb-24' : ''}`}
      data-delay={member.delay || undefined}
    >
      <div className="top">
        <div className="image">
          <img src={member.img} alt={member.name} />
        </div>
        <div className="tf-social justify-content-center">
          {member.socials.map((ic) => (
            <a key={ic} href="#" className="social-item">
              <i className={`icon ${ic}`}></i>
            </a>
          ))}
        </div>
      </div>
      <a href="#" className="name text-body-1 fw-semibold">{member.name}</a>
      <div className="sub">{member.role}</div>
    </div>
  );
}

export default Team;
