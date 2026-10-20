(() => {
  const fullscreenButton = document.getElementById('fullscreenButton');
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  const menuButton = document.getElementById('menuButton');
  const socialMenu = document.getElementById('socialMenu');

  const enterFullscreenPath = 'M4 11V4h7 M19 4h7v7 M26 19v7h-7 M11 26H4v-7';
  const exitFullscreenPath = 'M10 4v6H4 M20 4v6h6 M10 26v-6H4 M20 26v-6h6';

  function updateFullscreenControl() {
    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute('aria-label', isFullscreen ? 'Exit full screen' : 'Enter full screen');
    fullscreenButton.setAttribute('title', isFullscreen ? 'Exit full screen' : 'Enter full screen');
    fullscreenIcon.innerHTML = `<path d="${isFullscreen ? exitFullscreenPath : enterFullscreenPath}" />`;
  }

  fullscreenButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
      }
    } catch (error) {
      // Fullscreen can be unavailable in embedded previews or restricted browser contexts.
      console.warn('Fullscreen mode could not be changed in this browser context.', error);
    }
  });

  document.addEventListener('fullscreenchange', updateFullscreenControl);

  function setMenuOpen(open) {
    socialMenu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(socialMenu.hidden);
  });

  document.addEventListener('click', (event) => {
    if (!socialMenu.hidden && !socialMenu.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  updateFullscreenControl();
})();
