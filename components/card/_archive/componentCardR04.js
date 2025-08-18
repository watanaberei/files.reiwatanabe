import * as Glyphs from '../icon/componentGlyph.js';

function renderGlyph(accountId) {
  const key = `glyph${String(accountId || '').trim()}`;
  const mod = Glyphs[key];
  console.log('[ComponentCard] glyph key:', key, '->', mod ? 'found' : 'missing');
  return (mod && typeof mod.render === 'function') ? mod.render() : '';
}

// --- open helpers exposed globally ---
window.openDesign = function(url) {
  window.open(url, '_blank', 'noopener');
};

window.openPrototype = function(url) {
  // Try to create a near-fullscreen popup
  const features = `noopener,toolbar=0,location=0,menubar=0,status=0,scrollbars=1,resizable=1,width=${screen.availWidth},height=${screen.availHeight},left=0,top=0`;
  const w = window.open(url, '_blank', features);
  try {
    // For same-origin pages, attempt Fullscreen API after load
    if (w) {
      w.addEventListener('load', () => {
        const root = w.document.documentElement;
        if (root && root.requestFullscreen) {
          root.requestFullscreen().catch(()=>{});
        }
      });
      w.moveTo(0, 0);
      w.resizeTo(screen.availWidth, screen.availHeight);
    }
  } catch (_) {}
};

/**
 * @param {string} accountId
 * @param {string} projectId
 * @param {'on'|'off'} publicView
 * @param {string} accountName
 * @param {string} projectName
 * @param {'prototype'|'design'|''} kind
 */
export const ComponentCard = {
  render(accountId, projectId, publicView = 'on', accountName = '', projectName = '', kind = '') {
    const aid   = String(accountId || '').trim();
    const pid   = String(projectId || '').trim();
    const aName = accountName || aid;
    const pName = projectName || pid;
    const type  = String(kind || '').toLowerCase();
    const glyphHTML = renderGlyph(aid);
    const href = `./screens/${aid}/${pid}.html`;

    const body = `
      <div class="content">
        <div class="title stack">
          <span class="title-company">
            <div class="logo-slot">
              ${glyphHTML}
            </div>
            <span class="text02">${aName}</span>
          </span>
          <span class="divider">
            <span class="text02 regular"> / </span>
          </span>
          <span class="title-project">
            <span class="text02">${pName}</span>
          </span>
          ${publicView === 'off' ? `<span class="text02">Coming Soon</span>` : ``}
        </div>
      </div>
      <div class="image">
        <img src="/asset/media/thumbnail/${aid}/${pid}.png" alt="${pName}">
      </div>
    `;

    if (publicView !== 'on') {
      // Non-clickable
      return `<div class="item">${body}</div>`;
    }

    // Clickable according to type
    if (type === 'design') {
      // open in NEW TAB
      return `
        <a href="${href}" target="_blank" rel="noopener" class="item">
          ${body}
        </a>
      `;
    }

    if (type === 'prototype') {
      // open in NEW WINDOW (full screen attempt)
      return `
        <a href="javascript:void(0);" onclick="openPrototype('${href}');" class="item">
          ${body}
        </a>
      `;
    }

    // default (if type missing): preserve existing behavior
    return `
      <a href="javascript:void(0);" onclick="openDesign('${href}');" class="item">
        ${body}
      </a>
    `;
  }
};