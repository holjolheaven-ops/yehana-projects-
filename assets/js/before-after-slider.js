/**
 * Before / After slider
 * Drag, click, touch, or arrow-key (when focused) to reveal the "before" image.
 * Progressively enhanced: without JS the container still shows the "after" image.
 */
(function () {
  function initSlider(root) {
    const handle = root.querySelector('.ba-slider__handle');
    const beforeImg = root.querySelector('.ba-slider__img--before');
    const grip = root.querySelector('.ba-slider__grip');
    let dragging = false;

    function setPosition(pct) {
      const clamped = Math.min(96, Math.max(4, pct));
      handle.style.left = clamped + '%';
      beforeImg.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      root.setAttribute('aria-valuenow', Math.round(clamped));
    }

    function pctFromEvent(clientX) {
      const rect = root.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onMove(e) {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(pctFromEvent(clientX));
    }

    function startDrag(e) {
      dragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(pctFromEvent(clientX));
    }
    function endDrag() { dragging = false; }

    root.addEventListener('mousedown', startDrag);
    root.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    // Keyboard access: make handle focusable and respond to arrow keys
    root.setAttribute('tabindex', '0');
    root.setAttribute('role', 'slider');
    root.setAttribute('aria-label', root.dataset.label || 'Before and after comparison');
    root.setAttribute('aria-valuemin', '0');
    root.setAttribute('aria-valuemax', '100');
    setPosition(50);

    root.addEventListener('keydown', (e) => {
      const current = parseFloat(handle.style.left) || 50;
      if (e.key === 'ArrowLeft') { setPosition(current - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPosition(current + 5); e.preventDefault(); }
    });

    // Subtle idle nudge on load to hint interactivity, respects reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(() => {
        setPosition(58);
        setTimeout(() => setPosition(50), 550);
      });
    }
  }

  document.querySelectorAll('.ba-slider').forEach(initSlider);
})();
