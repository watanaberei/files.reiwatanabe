import * as Glyphs from '../icon/componentGlyph.js';
import * as tag from '../tag/attrtag.js';
import * as render from '../../function/render/render.js';



function renderGlyph(accountId) {
  const key = `glyph${String(accountId || '').trim()}`; // e.g., 'glyphATT'
  const mod = Glyphs[key];

  // Debugging: see what we're resolving
  console.log('[ComponentCard] glyph key:', key, '->', mod ? 'found' : 'missing');

  if (mod && typeof mod.render === 'function') {
    return mod.render();
  }

  // Safe fallback if not found (won't crash your render)
  console.warn('[ComponentCard] Missing glyph for', accountId, 'Expected export name:', key);
  return '';
}

export const ComponentCard = {
  render(accountId, projectId, accountName, projectName) {
    const aid = String(accountId || '').trim();
    const pid = String(projectId || '').trim();
    const arrow = Glyphs.glyphArrow.render();

    // If your route differs, update this:
    const href = `./screens/${aid}/${pid}.html`;

    const glyphHTML = render.renderGlyph(aid);

    return `
      <a href="javascript:void(0);" id="${aid}-${pid}" onclick="fullScreen('${href}');" class="item grid04 col04 row01">
        <div class="content">
          <div class="title stack">
            <div class="title-container">
              <span class="text title-account">
                <div class="logo logo-slot">
                  ${glyphHTML}
                </div>
                <span class="text02">${accountName}</span>
              </span>
              <span class="text divider">
                <span class="text02 regular"> / </span>
              </span>
            </div>
            
            <span class="text title-project">
              <span class="text02">${projectName}</span>
            </span>

            <span class="glyph glyph-arrow flat">
              ${arrow}
            </span>
          </div>
        </div>
        <div class="image thumbnail">
          <img src="/asset/media/thumbnail/${aid}/${pid}.png" alt="${pid}">
        </div>
      </a>
    `;
  }
};


export const ComponentCardTest = {
  /**
   * @param {Object} p
   * @param {string} p.accountId
   * @param {string} p.projectId
   * @param {string} p.type
   * @param {string[]} p.tags
   * @param {string} p.link
   */
  render({ accountId = '', projectId = '', accountName = '', projectName = '', type = 'project', tags = [], link = '' }) {
    const tagsHTML = (Array.isArray(tags) ? tags : []).map(t => `<span class="text02">${t}</span>`).join(' ');

    // If you have a route, adjust the onclick/fullScreen target here:
    const href = link || `./screens/${accountId}/${projectId}.html`;

    return `
    <div class="container item col04 row01 grid04">
      <a href="javascript:void(0);" id="${accountId}-${projectId}" onclick="fullScreen('${href}');" class="item col02">
        <div class="container content">
          <div class="title">
            <span class="line01">
              <span class="text02">${accountName}</span>
              <span class="text02 regular"> / </span>
              <span class="text02">${projectName}</span>
            </span>
          </div>
          <div class="tags-container array">
            ${tagsHTML}
          </div>
        </div>
        <div class="container image-container col02">
          <img src="./assets/media/thumbnail/${accountId}/${projectId}.png" alt="${projectId}">
        </div>
      </a>
    </div>
    `;
  }
};