import * as Glyphs from '../../components/icon/componentGlyph.js';


export function renderGlyph(accountId) {
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