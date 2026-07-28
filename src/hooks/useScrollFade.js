import { useEffect } from 'react';

/**
 * useScrollFade
 *
 * Reusable hook that applies the same GSAP scroll-fade logic used in the
 * original gsapAnimation.js → scrollEffectFade() to any section ref.
 *
 * Handles:
 *  - .effectFade.fadeUp      → y:50 slide-up, wrapped in overflow-hidden div
 *  - .effectFade.fadeRotateX → perspective rotationX flip
 *  - .effectFade.fadeLeft / .fadeRight / .fadeDown
 *  - .effectFade.fadeZoom
 *
 * Returns a cleanup function that kills all ScrollTrigger instances created
 * inside this section on unmount.
 *
 * @param {React.RefObject} ref - ref attached to the section root element
 */
export function useScrollFade(ref) {
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = ref.current;
    if (!root) return;

    const killList = [];

    root.querySelectorAll('.effectFade').forEach((el) => {
      const isNoDiv = el.classList.contains('no-div');
      let fromVars = { autoAlpha: 0 };
      let toVars = { autoAlpha: 1, duration: 1, ease: 'power3.out' };
      const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
      toVars.delay = delay;

      /* Wrap fadeUp (and not no-div) in overflow-hidden container */
      if (el.classList.contains('fadeUp') && !isNoDiv) {
        if (!el.parentElement.classList.contains('_fade-wrap')) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('overflow-hidden', '_fade-wrap');
          el.parentNode.insertBefore(wrapper, el);
          wrapper.appendChild(el);
        }
      }

      /* Resolve animation variant */
      if (el.classList.contains('fadeUp')) {
        fromVars.y = 50;
        toVars.y = 0;
      } else if (el.classList.contains('fadeDown')) {
        fromVars.y = -50;
        toVars.y = 0;
      } else if (el.classList.contains('fadeLeft')) {
        fromVars.x = -50;
        toVars.x = 0;
      } else if (el.classList.contains('fadeRight')) {
        fromVars.x = 50;
        toVars.x = 0;
      } else if (el.classList.contains('fadeRotateX')) {
        fromVars.rotationX = 45;
        fromVars.yPercent = 100;
        fromVars.transformOrigin = 'top center -50';
        toVars.rotationX = 0;
        toVars.yPercent = 0;
        toVars.transformOrigin = 'top center -50';
        toVars.duration = 1;
        toVars.ease = 'power3.out';

        /* Perspective wrapper */
        if (!isNoDiv) {
          if (!el.parentElement.classList.contains('_fade-wrap')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('overflow-hidden', '_fade-wrap');
            wrapper.style.perspective = '400px';
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
          } else {
            el.parentElement.style.perspective = '400px';
          }
        }
      } else if (el.classList.contains('fadeZoom')) {
        fromVars.scale = 0.8;
        toVars.scale = 1;
      }

      const startPush = el.classList.contains('view-visible') ? 'top 101%' : 'top 95%';

      gsap.set(el, fromVars);

      const anim = gsap.to(el, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: startPush,
          toggleActions: 'play none none none',
        },
      });

      if (anim.scrollTrigger) killList.push(anim.scrollTrigger);
    });

    return () => {
      killList.forEach((st) => st?.kill());
    };
  }, [ref]);
}
