/**
 * Back-to-top "slingshot"
 * - A ring around the button fills as you scroll down (visual "tension").
 * - Press and hold pulls the button back, like drawing a slingshot.
 * - Release launches the arrow and eases the page back to the top fast,
 *   with a small elastic bounce on arrival.
 */
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const ring = btn.querySelector('.back-to-top__ring-fg');
  const RING_CIRCUMFERENCE = 119.4; // 2 * PI * r(19)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ticking = false;

  function updateScrollState() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

    if (ring) ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - pct));

    if (scrollTop > window.innerHeight * 0.6) btn.classList.add('is-visible');
    else btn.classList.remove('is-visible');

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateScrollState();

  // Pull-back press feedback
  const arm = () => btn.classList.add('is-armed');
  const disarm = () => btn.classList.remove('is-armed');
  btn.addEventListener('pointerdown', arm);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((evt) => btn.addEventListener(evt, disarm));

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function launch() {
    const start = window.scrollY;
    if (start <= 0) return;

    if (reduceMotion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    btn.classList.add('is-launching');

    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const duration = Math.min(1100, Math.max(500, start * 0.55));
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(t);
      window.scrollTo(0, Math.round(start * (1 - eased)));

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        document.documentElement.style.scrollBehavior = previousBehavior;
        btn.classList.remove('is-launching');
        btn.classList.add('is-landed');
        setTimeout(() => btn.classList.remove('is-landed'), 480);
      }
    }

    requestAnimationFrame(step);
  }

  btn.addEventListener('click', launch);
})();
