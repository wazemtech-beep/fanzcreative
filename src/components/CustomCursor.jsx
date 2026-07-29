import { useEffect, useRef } from 'react';

/**
 * CustomCursor
 *
 * A smooth lerp-following dot cursor with mix-blend-mode: difference.
 * Centering is done via translate(-50%, -50%) chained in the JS transform
 * so the dot NEVER jumps when it grows on hover — no negative-margin bug.
 *
 * • Hides the native OS cursor on desktop (cursor: none).
 * • Grows when hovering interactive elements (links, buttons, cards).
 * • Scales down on click.
 * • Hidden on touch / coarse-pointer devices.
 */
function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Lerp state — start offscreen so first appearance is invisible
    let targetX = -300;
    let targetY = -300;
    let currentX = -300;
    let currentY = -300;
    let raf;

    // ── Mouse move ──────────────────────────────────────────────────────────
    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.opacity = '1';

      // Grow on interactive elements
      const interactive = Boolean(
        e.target.closest(
          'a, button, [role="button"], input, textarea, select, ' +
          '.palmer-video-card, .rw-card-wrapper, .tf-btn, ' +
          '.rw-casestudy-btn, .rw-nav-arrow, .framer-tab-btn'
        )
      );
      dot.classList.toggle('cc-hover', interactive);
    };

    // ── Press / release ─────────────────────────────────────────────────────
    const onDown = () => dot.classList.add('cc-click');
    const onUp   = () => dot.classList.remove('cc-click');

    // ── Visibility ──────────────────────────────────────────────────────────
    const onLeave = () => { dot.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; };

    // ── RAF loop (lerp) ─────────────────────────────────────────────────────
    const loop = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      // translate3d positions the dot, translate(-50%,-50%) always centers it
      // at the exact mouse point regardless of its current size → no jump
      dot.style.transform =
        `translate3d(${currentX}px,${currentY}px,0) translate(-50%,-50%)`;

      raf = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.body.addEventListener('mouseleave', onLeave);
    document.body.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.body.removeEventListener('mouseleave', onLeave);
      document.body.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []); // ← runs once, no stale closures

  return (
    <>
      <style>{`
        /* ── Hide native cursor on desktop ───────────────────────── */
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }

        /* ── Dot base ────────────────────────────────────────────── */
        .cc-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          pointer-events: none;
          z-index: 2147483647;       /* max z-index */
          mix-blend-mode: difference;
          opacity: 0;
          will-change: transform;
          /* transition only size — transform is handled by JS lerp */
          transition:
            width  0.3s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.25s ease,
            scale   0.15s ease;
        }

        /* ── Hover state: grow ───────────────────────────────────── */
        .cc-dot.cc-hover {
          width: 44px;
          height: 44px;
          /* centering is always done by translate(-50%,-50%) in JS  */
          /* so growing NEVER shifts the dot left or up              */
        }

        /* ── Click state: shrink ─────────────────────────────────── */
        .cc-dot.cc-click {
          scale: 0.7;
        }

        /* ── Hide on touch devices ───────────────────────────────── */
        @media (hover: none), (pointer: coarse) {
          .cc-dot { display: none !important; }
        }
      `}</style>

      <div ref={dotRef} className="cc-dot" />
    </>
  );
}

export default CustomCursor;
