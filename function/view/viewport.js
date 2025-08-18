// Viewport Guard + Motion Text
// - Desktop: text follows cursor
// - Mobile: text bounces like the old screensaver
(() => {
  const MIN_W = 1050;
  const MIN_H = 450;

  const log = (...a) => console.log('[ViewportGuard]', ...a);

  function isMobile() {
    const ua = navigator.userAgent || '';
    const mobileUA = /Mobi|Android|iPhone|iPod/i.test(ua);
    const iPadOS = /iPad|Tablet/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    return mobileUA || iPadOS;
  }

  // Return one of: 'mobile' | 'w' | 'h' | null
  function violation() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (isMobile()) return 'mobile';
    if (w < MIN_W) return 'w';
    if (h < MIN_H) return 'h';
    return null;
  }

  function ensureOverlay() {
    let el = document.getElementById('viewport-guard');
    if (el) return el;

    el = document.createElement('div');
    el.id = 'viewport-guard';
    el.setAttribute('hidden', '');
    el.innerHTML = `
      <div class="viewport-guard-backdrop"></div>
      <div class="viewport-guard-panel" id="viewport-guard-panel">
        <div class="viewport-guard-dot"></div>
        <div class="viewport-guard-text" id="viewport-guard-text">Expand Browser Width</div>
      </div>
    `;
    document.body.appendChild(el);

    // Scoped styles only for the guard
    const style = document.createElement('style');
    style.id = 'viewport-guard-style';
    style.textContent = `
      #viewport-guard[hidden]{
        display:none!important
      }
      #viewport-guard{
        position:fixed;
        inset:0;
        z-index:999999;
        display:grid;
        place-items:center;
        // inset:0;
        display: grid; 
        place-items: center;
        height: 100vh;
        width: 100vw;
        background-color: var(--rws-bcg-files, #E9AF19);
      }
      #viewport-guard .viewport-guard-backdrop{
        position:absolute;
        inset:0;
        // background:rgba(0,0,0,.72);
        backdrop-filter:blur(3px)
      }
      #viewport-guard .viewport-guard-panel{
        position:relative;
        max-width:100vw;
        min-width:320px;
        min-height:180px;
        width: 90vw;
        height: 100vh;
        font-size: var(--text02m-font-size, 10);
        font-weight: var(--text02m-font-style, 700);
        line-height: calc( var(--text02m-line-height, 10) / 40 );
        letter-spacing: var(--text02m-letter-spacing, 0.03);
        color: var(--rws-warning, #E94523);
        overflow:hidden; /* keep the text inside for bounce */
        cursor:default;
      }
      #viewport-guard .viewport-guard-dot{
        // width:10px;
        // height:10px;
        // border-radius:50%;
        // background:#ffd54a;
        // display:inline-block;
        // margin-bottom:10px;
      }
      #viewport-guard .viewport-guard-text{
        position:absolute; /* required for follow/bounce */
        left:1.5px;
        top:-1.5px;
        white-space:nowrap;
        // font-size:20px;
        // line-height:1.35;
        // letter-spacing:.2px;
        user-select:none;pointer-events:none; /* so cursor events pass through */
      }
      body.viewport-guard-block{
        overflow:hidden!important;
        background-color: var(--rws-bcg-files);
      }
    `;
    document.head.appendChild(style);
    return el;
  }

  // State
  let mode = null;             // 'follow' | 'bounce' | null
  let rafFollow = 0;         // animation gate for follow (we use rAF to throttle mousemove)
  let rafBounce = 0;
  let vel = { x: 2.2, y: 1.8 }; // px per frame for bounce
  let pos = { x: 16, y: 52 };

  function setMessage(kind) {
    // text.textContent = (kind === 'mobile') ? '▧ Desktop ▧ Only ▧' : '▧ Expand ▧ Browser ▧';
    const text = document.getElementById('viewport-guard-text');
    if (!text) return;
    if (kind === 'mobile') text.textContent = '<span class="Text01">View On Desktop</span>';
    else if (kind === 'w') text.textContent = 'Expand Browser Width';
    else if (kind === 'h') text.textContent = 'Expand Browser Height';
  }

  function show(kind) {
    const overlay = ensureOverlay();
    overlay.removeAttribute('hidden');
    document.body.classList.add('viewport-guard-block');
    setMessage(kind);
    startMotion(kind);
  }

  function hide() {
    const overlay = document.getElementById('viewport-guard');
    if (!overlay) return;
    overlay.setAttribute('hidden', '');
    document.body.classList.remove('viewport-guard-block');
    stopMotion();
  }

  function startMotion(kind) {
    const panel = document.getElementById('viewport-guard-panel');
    const text = document.getElementById('viewport-guard-text');
    if (!panel || !text) return;

    stopMotion(); // reset previous mode

    if (kind === 'mobile') {
      mode = 'bounce';
      // randomize initial direction a bit
      vel.x = (Math.random() > 0.5 ? 1 : -1) * (1.8 + Math.random() * 1.8);
      vel.y = (Math.random() > 0.5 ? 1 : -1) * (1.4 + Math.random() * 1.6);
      // center-ish start
      const p = panel.getBoundingClientRect();
      const t = text.getBoundingClientRect();
      pos.x = Math.max(0, (p.width - t.width) / 2);
      pos.y = Math.max(0, (p.height - t.height) / 2);
      bounceLoop();
    } else {
      mode = 'follow';
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }
  }

  function stopMotion() {
    if (mode === 'follow') {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafFollow);
      rafFollow = 0;
    }
    if (mode === 'bounce') {
      cancelAnimationFrame(rafBounce);
      rafBounce = 0;
    }
    mode = null;
  }

  // ---------- Follow (desktop) ----------
  function onMouseMove(e) {
    if (rafFollow) return;
    rafFollow = requestAnimationFrame(() => {
      rafFollow = 0;
      const panel = document.getElementById('viewport-guard-panel');
      const text = document.getElementById('viewport-guard-text');
      if (!panel || !text) return;

      const p = panel.getBoundingClientRect();
      const t = text.getBoundingClientRect();

      // mouse position relative to panel
      const mx = e.clientX - p.left;
      const my = e.clientY - p.top;

      // center text on cursor, clamp to panel bounds
      const x = clamp(mx - t.width / 2, 0, p.width - t.width);
      const y = clamp(my - t.height / 2, 0, p.height - t.height);

      text.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ---------- Bounce (mobile) ----------
  function bounceLoop() {
    const panel = document.getElementById('viewport-guard-panel');
    const text = document.getElementById('viewport-guard-text');
    if (!panel || !text || mode !== 'bounce') return;

    const p = panel.getBoundingClientRect();
    const t = text.getBoundingClientRect();

    pos.x += vel.x;
    pos.y += vel.y;

    // hit tests
    if (pos.x <= 0) { pos.x = 0; vel.x *= -1; }
    if (pos.y <= 0) { pos.y = 0; vel.y *= -1; }
    if (pos.x + t.width >= p.width) { pos.x = p.width - t.width; vel.x *= -1; }
    if (pos.y + t.height >= p.height) { pos.y = p.height - t.height; vel.y *= -1; }

    text.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    rafBounce = requestAnimationFrame(bounceLoop);
  }

  // ---------- Utilities ----------
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

  // Re-evaluate conditions and mode
  let raf = 0;
  function scheduleCheck() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const v = violation();
      if (v) show(v); else hide();
    });
  }

  window.addEventListener('resize', scheduleCheck, { passive: true });
  window.addEventListener('orientationchange', scheduleCheck, { passive: true });
  document.addEventListener('DOMContentLoaded', scheduleCheck);
})();
