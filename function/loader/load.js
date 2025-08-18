// function/loader/load.js
// - Full-screen loader during page load
// - Lazy-load <img.lazy[data-src]> with placeholder var(--rw-files)
// - Scroll animations (trigger when element enters 90% of viewport)
//   text: fade in + move Y 30px->0
//   card: move Y 100px->0 (ease-in)
//   account bg: soft tint in
//   image shadow: none -> var(--card-shadow, 0 20px 60px rgba(0,0,0,.35))

(() => {
    // ---------- Inject minimal, scoped styles ----------
    // const style = document.createElement('style');
    // style.textContent = `
    //   /* Loader */
    //   .rw-loader{
    //     position:fixed;
    //     inset:0;
    //     z-index:2147483647;
    //     display:grid;
    //     place-items:center;
    //     background:#0b0b0b}
    //   .rw-loader__dot{width:10px;height:10px;border-radius:50%;background:#ffd54a;animation:rw-pulse .9s infinite ease-in-out}
    //   @keyframes rw-pulse{0%,100%{transform:scale(.85);opacity:.6}50%{transform:scale(1.25);opacity:1}}

    //   /* Hover info (hidden by default; shown on .item:hover) */
    //   .subtext{position:absolute;left:16px;right:16px;bottom:16px;opacity:0;transform:translateY(12px);
    //     transition:opacity .25s ease, transform .25s ease; pointer-events:none}
    //   .tag-list{margin-top:6px;display:flex;flex-wrap:wrap;gap:6px}
    //   .list{display:inline-block;opacity:.9}
    //   .item:hover .subtext{opacity:1;transform:translateY(0)}

    //   /* Image lazy placeholder on the wrapper .image */
    //   .image.thumb-loading{background:var(--rw-files) center/cover no-repeat}
    //   .image.thumb-loaded{background:none}

    //   /* Scroll-in (initial state) */
    //   .anim-text{opacity:0;transform:translateY(30px);will-change:transform,opacity}
    //   .anim-card{transform:translateY(100px);opacity:0;will-change:transform,opacity}
    //   .anim-image{filter:none;will-change:filter}
    //   .anim-account{transition:background-color .5s ease}

    //   /* Activated state (when observed) */
    //   .is-in .anim-text{opacity:1;transform:translateY(0);transition:opacity .5s ease, transform .5s ease}
    //   .is-in.anim-card{opacity:1;transform:translateY(0);transition:opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1)}
    //   .is-in .anim-image{filter:drop-shadow(var(--card-shadow, 0 20px 60px rgba(0,0,0,.35)))}
    //   .is-in.anim-account{background-color:var(--account-tint, rgba(255,213,74,.08))}
    // `;
    // document.head.appendChild(style);

    // ---------- Full-screen loader ----------
    const loader = document.createElement('div');
    loader.className = 'rw-loader';
    loader.innerHTML = `<div class="rw-loader__dot"></div>`;
    document.documentElement.classList.add('rw-loading');
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        requestAnimationFrame(() => {
            loader.remove();
            document.documentElement.classList.remove('rw-loading');
        });
    });

    // ---------- Lazy load images ----------
    function lazyLoadImg(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        const wrapper = img.closest('.image');
        wrapper?.classList.add('thumb-loading');

        const swap = () => {
            img.src = src;
            img.addEventListener('load', () => {
                wrapper?.classList.remove('thumb-loading');
                wrapper?.classList.add('thumb-loaded');
                img.classList.add('loaded');
            }, { once: true });
            // if error, remove placeholder anyway
            img.addEventListener('error', () => {
                wrapper?.classList.remove('thumb-loading');
            }, { once: true });
        };

        // Use native loading if present, else IntersectionObserver
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
            swap();
        } else {
            // fallback: wait for visibility
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        swap();
                        obs.disconnect();
                    }
                });
            }, { rootMargin: '100px' });
            io.observe(img);
        }
    }

    // ---------- Scroll animations ----------
    // “90% of browser”: fire when top enters bottom 10% of the viewport.
    // Equivalent: rootMargin bottom = -10%
    const sectionIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-in');
                // one-shot
                sectionIO.unobserve(e.target);
            }
        });
    }, { 
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0 });

    function wireAnimations() {
        // Cards (outer clickable/nonclickable .item)
        document.querySelectorAll('.item.anim-card').forEach(el => sectionIO.observe(el));
        // Account containers
        document.querySelectorAll('.item-account.anim-account').forEach(el => sectionIO.observe(el));
        // Text groups (anything marked .anim-text and wrapped by a container we toggle)
        document.querySelectorAll('.anim-text').forEach(el => {
            const host = el.closest('.item, .item-account') || el;
            sectionIO.observe(host);
        });
        // Image shadow
        document.querySelectorAll('.anim-image').forEach(el => {
            const host = el.closest('.item') || el;
            sectionIO.observe(host);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        // lazy
        document.querySelectorAll('img.lazy[data-src]').forEach(lazyLoadImg);
        // anim
        wireAnimations();
    });
})();