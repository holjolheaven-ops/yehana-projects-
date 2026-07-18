/**
 * Hero motion: subtle pointer-driven parallax on the blueprint grid.
 * Disabled entirely under prefers-reduced-motion.
 */
(function () {
  const hero = document.querySelector('.hero');
  const grid = document.querySelector('.hero__grid');
  if (!hero || !grid) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

  let ticking = false;
  hero.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      grid.style.transform = `translate(${x * -12}px, ${y * -12}px)`;
      ticking = false;
    });
  });

  hero.addEventListener('mouseleave', () => {
    grid.style.transform = 'translate(0, 0)';
  });
})();
