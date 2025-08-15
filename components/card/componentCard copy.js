import * as glyph from '../icon/componentGlyph';
import * as tag from '../tag/attrtag';

export const ComponentCard = {
    render: (companyId, projectId, type, attributes, link) => {
        // const Type = type || 'project';
        // [componentCard.js][line ~6] - Begin tag rendering using attrtag and attributes from projectData.js

        // Defensive: ensure attributes is an array
        // const attributesArray = Array.isArray(attributes) ? attributes : [];
        // console.log('[componentCard.js][line ~8] - attributesArray:', attributesArray);

        // Use the attrtag component from attrtag.js to render each attribute as a tag
        // Each tag will be rendered using attrtag.render({ tags: attribute })
        // const TagsHTML = attributesArray
        //   .map(attr => {
        //     // Render each attribute as a tag using attrtag
        //     const tagHTML = tag.attrtag.render({ tags: attr });
        //     console.log('[componentCard.js][line ~14] - Rendered tagHTML for attribute:', attr, tagHTML);
        //     return tagHTML;
        //   })
        //   .join(' ');

        // const Link = link || '';
        const CompanyId = companyId || '';
        const ProjectId = projectId || '';
        const glyphTag = "glyph"+companyId;
        console.log(glyphTag);
        const glyphLogo = glyph.glyphTag.render(); 

        // [componentCard.js][line ~22] - Finished tag rendering

        return `
          <!-- Avis Budget Group / Modular Design System -->
            <a href="javascript:void(0);" id="${CompanyId}" onclick="fullScreen('/${CompanyId}/${ProjectId}');" target="_blank" class="title">

            <div class="container content">
              <div class="title">
                <span class="line01 has-glyph">
                  ${glyphLogo}
                  <span class="text02">
                    ${CompanyId}
                  </span>
                  <span class="text02 regular">
                    /
                  </span>
                </span>
                <span class="text02">
                  ${ProjectId}
                </span>
              </div>
              <div class="Tags-container array">
                $ {TagsHTML}
              </div>
            </div>

            <div class="container image-container">
              <img src="../../assets/media/thumbnail/${CompanyId}/${ProjectId}.png" alt="${ProjectId}" />
            </div>
            
          </a>
            `;
    },
};