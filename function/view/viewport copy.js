// Viewport Guard — shows an overlay if on mobile OR the window is too small.
// No existing classes/files are changed.
(() => {
  const MIN_W = 1200;
  const MIN_H = 900;

  const log = (...a) => console.log('[ViewportGuard]', ...a);

  // Conservative mobile test (covers iOS/iPadOS 13+, Android, etc.)
  function isMobile() {
    const ua = navigator.userAgent || '';
    const mobileUA = /Mobi|Android|iPhone|iPod/i.test(ua);
    const iPadOS = /iPad|Tablet/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    return mobileUA || iPadOS;
  }

  // Decide what message (if any) to show
  function violation() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const mobile = isMobile();
    log(`check w:${w} h:${h} mobile:${mobile}`);

    if (mobile) return 'View on Desktop or Expand Browser';
    if (w < MIN_W || h < MIN_H) return 'Expand Browser or View on Desktop';
    return null;
  }

  // Build overlay once
  function ensureOverlay() {
    let el = document.getElementById('viewport-guard');
    if (el) return el;

    el = document.createElement('div');
    el.id = 'viewport-guard';
    el.setAttribute('hidden', ''); // start hidden
    el.innerHTML = `
      <div class="viewport-guard-backdrop"></div>
      <div class="viewport-guard-panel">
        <!--
          <div class="viewport-guard-dot"></div>
        -->
        <div class="viewport-guard-text text02" id="viewport-guard-text"></div>
      </div>
    `;
    document.body.appendChild(el);

    // Inject minimal scoped styles
    const style = document.createElement('style');
    style.id = 'viewport-guard-style';
    style.textContent = `
      #viewport-guard[hidden] { display: none !important; }
      #viewport-guard {
        position: fixed; inset: 0; z-index: 999999;
        display: grid; place-items: center;
        height: 100vh;
        width: 100vw;
        background-color: var(--rws-bcg-files);
      }
      #viewport-guard .viewport-guard-backdrop {
        position: absolute; inset: 0;
        // background: rgba(0,0,0,0.72);
        // backdrop-filter: blur(3px);
        // height: 100vh;
        // width: 100vw;
        // background-color: var(--rws-bcg-files);
      }
      #viewport-guard .viewport-guard-panel {
        position: relative;
       
      }
      #viewport-guard .viewport-guard-dot {

        
      }
      #viewport-guard .viewport-guard-text {
        font-size: var(--text06m-font-size);
        font-weight: var(--text06m-font-style);
        line-height: calc( var(--text06m-line-height) / 40 );
        letter-spacing: var(--text06m-letter-spacing);
        color: var(--rws-warning);
      }
      body.viewport-guard-block { 
      overflow: hidden !important; 
      }
    `;
    document.head.appendChild(style);
    return el;
  }

  function show(msg) {
    const overlay = ensureOverlay();
    overlay.removeAttribute('hidden');
    const text = overlay.querySelector('#viewport-guard-text');
    text.textContent = msg;
    document.body.classList.add('viewport-guard-block');
    log('show:', msg);
  }

  function hide() {
    const overlay = document.getElementById('viewport-guard');
    if (!overlay) return;
    overlay.setAttribute('hidden', '');
    document.body.classList.remove('viewport-guard-block');
    log('hide');
  }

  // Throttle resize/orientation events
  let raf = 0;
  function scheduleCheck() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const msg = violation();
      if (msg) show(msg); else hide();
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    scheduleCheck();
    window.addEventListener('resize', scheduleCheck, { passive: true });
    window.addEventListener('orientationchange', scheduleCheck, { passive: true });
  });
})();