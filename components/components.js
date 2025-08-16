// /components.js
// Group projects by company and render each via ContainerProject.
// (Keeps your existing #project-cards-container mount point.)

import {ContainerAccount} from './container/containerAccount..js';
import { projectData } from '../data/projectData.js';


export const CardRenderer = {
  init() {
    console.log('[CardRenderer] init');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[CardRenderer] DOM ready');

      const container = document.getElementById('project-cards-container');
      if (!container) {
        console.error('[CardRenderer] #project-cards-container not found');
        return;
      }

      const accounts = Object.entries(projectData || {});
      console.log('[CardRenderer] accounts:', accounts.length);

      accounts.forEach(([accountId, projectsObj], idx) => {
        try {
          const html = ContainerAccount.render({ accountId, projects: projectsObj });
          if (!html) return;

          const wrap = document.createElement('div');
          wrap.innerHTML = html; // keep exact DOM/classes from template
          container.appendChild(wrap.firstElementChild);

          console.log('[CardRenderer] appended account', idx, accountId);
        } catch (e) {
          console.error('[CardRenderer] account render error', { accountId, e });
        }
      });

      console.log('[CardRenderer] done');
    });
  }
};

CardRenderer.init();
  