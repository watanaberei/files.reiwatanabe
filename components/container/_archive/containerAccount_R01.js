// /components/containerAccount.js
// Renders one account container with a dynamic number of projects.
// DOM/class names MUST match your CSS exactly.

import { ComponentCard } from '../card/componentCard.js';
import * as render from '../../function/render/render.js';

/** Small subcomponent for the count badge/slot */
/** tiny subcomponent for the count slot */
const ProjectCount = {
  render(n = 0) {
    const count = String(n).padStart(2, '0'); // "02", "12", etc.
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
      const aid = String(accountId || '').trim();
      const entries = Object.entries(projects || {});
      if (!aid || entries.length === 0) return '';
  

    // Header values
    const firstMeta   = entries[0]?.[1] || {};
    const AccountName = firstMeta.accountName || aid;
    const ProjectName = firstMeta.projectName || 'WIP';
    const projectCount = entries.length;

    // inside ContainerAccount.render(), where you build projectItems
    const projectItems = entries.map(([projectKey, meta]) => {
      const pid         = String((meta && meta.projectId) || projectKey).trim();
      const projectName = String((meta && meta.projectName) || pid).trim();
      const accountName = String((meta && meta.accountName) || aid).trim();
      
      const pvRaw       = (meta && meta.publicView) ?? 'on';
      const publicView  = String(pvRaw).trim().toLowerCase();  // 'on' | 'off'
      const kind        = String((meta && meta.type) || '').trim().toLowerCase(); // 'prototype'|'design'|''

      return ComponentCard.render(aid, pid, publicView, accountName, projectName, kind);
    }).join('');

    const glyphHTML = render.renderGlyph  (aid);
    
    // build cards (pass publicView through)
    // const projectItems = entries.map(([projectKey, meta]) => {
    //   const pid        = (meta && meta.projectId) || projectKey;
    //   const publicView = (meta && meta.publicView) || 'on';
    //   return ComponentCard.render(aid, pid, publicView);
    // }).join('');


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
            <!--
            <div class="account-name text left col01">
              <div class="reimagining">
                <span class="text02">
                  ${ProjectName}
                </span>
              </div>
            </div>
            -->
            <div class="header-subtitle-primary col01 grid02 right">
              <span class="text02">
              ${String(entries.length).padStart(2, '0')}
              </span>
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
