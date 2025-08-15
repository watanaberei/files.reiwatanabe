// If you also need Figma embed modes elsewhere, keep them here or in a separate figmaData.js
export const modes = {
  design: {
    footer:       { property: "footer",             state: "false" },
    viewport:     { property: "viewport-controls",  state: "true"  },
    pageSelector: { property: "page-selector",      state: "false" },
    theme:        { property: "theme",              state: "system"}
  },
  prototype: {
    footer:       { property: "footer",             state: "true"  },
    viewport:     { property: "viewport-controls",  state: "false" },
    pageSelector: { property: "page-selector",      state: "true"  },
    theme:        { property: "theme",              state: "dark"  }
  },
  dev: {
    footer:       { property: "footer",             state: "false" },
    viewport:     { property: "viewport-controls",  state: "false" },
    pageSelector: { property: "page-selector",      state: "false" },
    theme:        { property: "theme",              state: "light" }
  }
};