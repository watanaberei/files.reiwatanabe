// ContainerProject groups a company's projects and renders a header + its cards.
//
// Usage:
//   import { ContainerProject } from '../container/containerProject.js'
//   const html = ContainerProject.render({ companyId: 'ATT', projects: projectData.ATT })
//
// It expects your data shape:
// projectData = {
//   ATT: {
//     "Low-Midfunnel": {...},
//     "Case Study": {...}
//   },
//   ChromeOS: { ... }
// }

// /components/containerAccount.js
// Renders one account container with a dynamic number of projects.
// DOM/class names MUST match your CSS exactly.

import { ComponentCard } from '../card/componentCard.js';
import * as render from '../../function/render/render.js';

/** Small subcomponent for the count badge/slot */
const AccountCount = {
  render(n = 0) {
    const count = String(n).padStart(2, '0'); // e.g., "02"
    return `<div class="project-count"><span class="text02">${count}</span></div>`;
  }
};

export const ContainerAccount = {
  /**
   * @param {Object} opts
   * @param {string} opts.accountId
   * @param {Object<string, Object>} opts.projects - projectData[accountId]
   */
  render({ accountId = '', projects = {} } = {}) {
    const aid = String(accountId).trim();
    const entries = Object.entries(projects || {});
    if (!aid || entries.length === 0) return '';

    // Use accountName for header, projectName for subtitle
    const firstMeta = entries[0]?.[1] || {};
    const AccountName = firstMeta.accountName || aid;
    const ProjectName = firstMeta.projectName || 'Reimagining';
    const projectCount = entries.length;

    const glyphHTML = render.renderGlyph  (aid);
    
    const projectItems = entries.map(([projectKey, meta]) => {
      const pid = (meta && meta.projectId) || projectKey;
      return ComponentCard.render(aid, pid, meta.accountName, meta.projectName);
    }).join('');


    // EXACT DOM you asked for (account version)
    return `
      <div class="account item-account grid04 col04 row01">



        <div class="header grid04 col04 row01">

          <div class="header-title col02 row01">
            <div class="account-name left col02 row01">
               <span class="text text-logo title-account">
                <div class="logo logo-slot">
                  ${glyphHTML}
                </div>
                <span class="text02">
                  ${AccountName}
              </span>
              </span>
            </div>
          </div>
       
          <div class="header-subtitle grid02 col02 row01">
            <div class="account-name text left col01">
              <div class="reimagining">
                <span class="text02">
                  ${ProjectName}
                </span>
              </div>
            </div>
            <div class="reimagining col01 right">
              ${AccountCount.render(projectCount)}
            </div>
          </div>

        </div>
      
        <div class="container items col04 row01 grid04">
          ${projectItems}
        </div>



      </div>
    `;
  }
};
