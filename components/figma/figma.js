// Import modes from data/figma.js
import { modes } from '../../data/figmaData.js';

/* ========= MODE STATE ========= */
// This object will hold the current mode and allow dynamic setting/getting
export const figmaModeState = {
  // Default mode is 'design', can be set externally
  mode: 'design',
  // Helper to get the current mode's params string
  get modeParams() {
    // Defensive: fallback to 'design' if mode is not valid
    const modeKey = this.mode && modes[this.mode] ? this.mode : 'design';
    return setMode(modes[modeKey]);
  },
  // Helper to set the mode dynamically
  setMode(newMode) {
    if (modes[newMode]) {
      this.mode = newMode;
      console.log('[figma.js][figmaModeState.setMode] Mode set to:', newMode);
    } else {
      console.warn('[figma.js][figmaModeState.setMode] Invalid mode:', newMode);
    }
  }
};

// Example usage (external):
// import { figmaModeState } from '../../components/figma/figma.js';
// figmaModeState.setMode('prototype');

/*******************************
 * Figma Embed Controller (ATT)
 *******************************/

// ATT

/* ========= DOM REFS ========= */
const iframe    = document.querySelector("#embed-frame");
const fileCard  = document.getElementById("FileCard");   // fixed: no '#'
const files     = document.getElementById("Files");
const PagesID   = document.querySelector("#PagesID");
const SectionID = document.querySelector("#SectionID");

/* ========= MODES ========= */
// NOTE: modes is now imported from data/figma.js, do not redeclare here

// let currentMode   = "."+"design";
// let modeParams    = setMode(modes[currentMode]);

/**
 * Returns the mode query string for the given properties object.
 * @param {object} propertiesObj
 * @returns {string}
 */
export function setMode(propertiesObj) {
  return Object.values(propertiesObj)
    .map(setting => `&${setting.property}=${setting.state}`)
    .join("");
}

/* ========= URL BUILDER ========= */
export function embedUrl(pageId, modeQuery) {
  return `https://embed.figma.com/design/${AttId}/${AttName}?node-id=${pageId}&embed-host=share${modeQuery}`;
}

/* ========= STATE ========= */
let FileDoc         = null;
let AttPages        = [];
let activePageId    = null;
let activeSectionId = null;
let figmaLoaded     = false;

/* ========= HELPERS ========= */
export function figmaOrigin() {
  try {
    return new URL(iframe.src || "https://embed.figma.com").origin;
  } catch {
    return "https://embed.figma.com";
  }
}

export function postToFigma(message) {
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, figmaOrigin());
  }
}

/* ========= FIGMA API ========= */
export async function getFile(fileId) {
  const res  = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
    method: "GET",
    headers: { "X-Figma-Token": figmaApiKey }
  });
  const json = await res.json();
  return json?.document || null;
}

export async function getPages(figmaKey, figmaId) {
  const res  = await fetch(`https://api.figma.com/v1/files/${figmaId}`, {
    method: "GET",
    headers: { "X-Figma-Token": figmaKey }
  });
  const json   = await res.json();
  const pages  = json?.document?.children || [];
  AttPages     = pages.map(p => ({ name: p.name, id: p.id }));
  return AttPages;
}

export function getPage({ file, pageId, pageName }) {
  const pages = file?.children || [];
  return pages.find(
    p => (pageId && p.id === pageId) || (pageName && p.name === pageName)
  );
}

export function getSectionsForPage(file, pageId) {
  const page = getPage({ file, pageId, pageName: null });
  const kids = page?.children || [];
  return kids
    .filter(node => node.type === "SECTION")
    .map(sec => ({ id: sec.id, name: sec.name }));
}

/* ========= EMBED ACTIONS ========= */
export function scrollAndZoomIntoView(nodeId) {
  activeSectionId = nodeId;
  // Use dynamic modeParams from figmaModeState
  const nodes = nodeId + figmaModeState.modeParams;
  console.log('[figma.js][scrollAndZoomIntoView] nodeId:', nodeId, 'modeParams:', figmaModeState.modeParams);

  if (!figmaLoaded) {
    iframe.src = embedUrl(nodeId, figmaModeState.modeParams);
    console.log('[figma.js][scrollAndZoomIntoView] iframe.src set (not loaded):', iframe.src);
    return;
  }

  // postToFigma({
  //   type: "scrollAndZoomIntoView",
  //   nodeId
  // });
  // Figma.viewport.scrollAndZoomIntoView(nodes);
}

export function loadPage(pageId) {
  activePageId    = pageId;
  activeSectionId = null;
  console.log('[figma.js][loadPage] Loading pageId:', pageId, 'modeParams:', figmaModeState.modeParams);

  if (!figmaLoaded) {
    iframe.src = embedUrl(pageId, figmaModeState.modeParams);
    console.log('[figma.js][loadPage] iframe.src set (not loaded):', iframe.src);
    return;
  }

  postToFigma({
    type: "setCurrentPage",
    pageId
  });
}

/* ========= UI RENDER ========= */
export function renderPageButtons(pages) {
  if (!PagesID) return;
  PagesID.innerHTML = "";

  pages.forEach(({ id, name }) => {
    const button = document.createElement("button");
    button.id = id;
    button.className = `${id} button chapter`;
    button.innerHTML = `<span class="text03">${name}</span>`;
    button.addEventListener("click", () => {
      loadPage(id);
      const sections = getSectionsForPage(FileDoc, id);
      renderSectionTabs(sections);
    });
    PagesID.appendChild(button);
  });
}

export function renderSectionTabs(sections) {
  if (!SectionID) return;
  SectionID.innerHTML = "";

  sections.forEach(({ id, name }) => {
    const tab = document.createElement("button");
    tab.className = `tab section-${id}`;
    tab.textContent = name;

    tab.addEventListener("click", () => {
      const prev = SectionID.querySelector(".tab.active");
      if (prev) prev.classList.remove("active");
      tab.classList.add("active");

      scrollAndZoomIntoView(id);
    });

    SectionID.appendChild(tab);
  });
}

/* ========= PRELOAD / VISIBILITY ========= */
export function preloadFigma(startNodeId) {
  if (!iframe.src) {
    iframe.src = embedUrl(startNodeId, figmaModeState.modeParams);
    console.log('[figma.js][preloadFigma] Preloading with nodeId:', startNodeId, 'modeParams:', figmaModeState.modeParams);
  }
}

export function showFigmaAndHideCard() {
  if (files)  
    // files.removeAttribute('style');
    files.style.display = "none";
  if (iframe) iframe.style.visibility = "visible";
  console.log('[figma.js][showFigmaAndHideCard] Files hidden, iframe visible');
}
/*******************************
 * Exportable figmaViewer INIT
 * 
 * Usage in screenFile.js:
 * ---------------------------------
 * import { figmaViewer } from '../../component/figma/figmaViewer.js';
 * // In your after_render or init:
 * figmaViewer();
 * ---------------------------------
 *******************************/
export async function figmaViewer() {
  // Start with File Card visible, iframe hidden (we still preload behind it)
  console.log('[figmaViewer.js][figmaViewer] Initializing Figma Viewer');
  if (iframe) {
    iframe.style.visibility = "hidden";
    console.log('[figmaViewer.js][figmaViewer] iframe hidden on init');
  }

  if (fileCard) {
    fileCard.addEventListener("click", () => {
      console.log('[figmaViewer.js][figmaViewer] FileCard clicked');
      showFigmaAndHideCard();
      if (!figmaLoaded && activePageId) {
        iframe.src = embedUrl(activePageId, figmaModeState.modeParams);
        console.log('[figmaViewer.js][figmaViewer] iframe src set on FileCard click', { src: iframe.src });
      }
    });
  }
  
  FileDoc = await getFile(AttId);
  console.log('[figmaViewer.js][figmaViewer] FileDoc loaded', FileDoc);
  const pages = FileDoc?.children || [];
  const firstPage = pages[0];
  activePageId = firstPage?.id || null;
  console.log('[figmaViewer.js][figmaViewer] activePageId set', { activePageId });

  await getPages(figmaApiKey, AttId);
  console.log('[figmaViewer.js][figmaViewer] AttPages loaded', AttPages);
  renderPageButtons(AttPages);

  const firstSections = getSectionsForPage(FileDoc, activePageId);
  console.log('[figmaViewer.js][figmaViewer] firstSections loaded', firstSections);
  renderSectionTabs(firstSections);

  // Preload the starting page behind the FileCard
  if (activePageId) {
    preloadFigma(activePageId);
    console.log('[figmaViewer.js][figmaViewer] Preloading Figma for activePageId', { activePageId });
  }

  // Mark embed as ready once it loads
  iframe.addEventListener("load", () => {
    figmaLoaded = true;
    console.log('[figmaViewer.js][figmaViewer] iframe loaded, figmaLoaded set to true');
  });

  // // Reveal embed when user clicks the project file card
  // if (fileCard) {
  //   fileCard.addEventListener("click", () => {
  //     showFigmaAndHideCard();
  //     if (!figmaLoaded && activePageId) {
  //       iframe.src = embedUrl(activePageId, figmaModeState.modeParams);
  //     }
  //   });
  // }
}

/* ========= MODE SWITCH (optional) ========= */
export function setCurrentMode(nextModeKey) {
  if (!modes[nextModeKey]) return;
  figmaModeState.setMode(nextModeKey);
  console.log('[figma.js][setCurrentMode] Mode switched to:', nextModeKey);

  if (activeSectionId) {
    iframe.src = embedUrl(activeSectionId, figmaModeState.modeParams);
    console.log('[figma.js][setCurrentMode] iframe.src set to section:', iframe.src);
  } else if (activePageId) {
    iframe.src = embedUrl(activePageId, figmaModeState.modeParams);
    console.log('[figma.js][setCurrentMode] iframe.src set to page:', iframe.src);
  }
}
