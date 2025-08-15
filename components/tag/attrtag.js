// import * as glyph from "../icon/componentGlyph.js";

export const attrtag = {
    render: (data) => {
      // const icon = glyph.glyphDetailStar;
      const attribute = data.tags;
      // const count = data.count;   
      return `
        <button class="attrtag tag">
            $ {icon}  
            <span class="label">${attribute}</span>
        </button>
      `;
  }
};

export const attrtagRating = {
  render: (data) => {
    // const icon = glyph.glyphDetailStar;
    const rating = data.rating;
    return `
        <button class="attrtag tag">
            ${icon}  
            <span class="label">${rating}</span>
        </button>
      `;
  }
};

// Updated attrtagGroup component
export const attrtagGroup = {
  render: (data) => {
    return `
      <button class="attrtag tag" data-name="value" ${
        data.url ? `data-url="${data.url}"` : ""
      }>
      <div class="label">
        <span class="text02" id="text02">${data.category}</span>
      </div>
      <div class="single-icon">
        $ {glyph.glyphActionArrow}
      </div>
      </button>
    `;
  }
};




// Larger tags
export const attrtagCategory = {
  render: (data) => {
    return `
      <button class="attrtag tag attrtagCategory" data-name="value" ${
        data.url ? `data-url="${data.url}"` : ""
      }>
      <div class="label">
        <span class="text02" id="text02">${data.category}</span>
      </div>
      <div class="single-icon">
        $ {glyph.glyphActionArrow}
      </div>
      </button>
    `;
  }
};


// export const attrtagGroup = {
//   render: (data) => {
//     const category = data.category;
//     return `
//       <button class="attrtag tag">
//         <div class="attrtag tag">
//           <div class="label">
//             <span class="label">${category}</span>
//           </div>
//           <div class="icon">
//             ${ glyph.glyphActionArrow}
//           </div>
//         </div>
//       </button>
//     `;
//   }
// };

// Updated attrtagItem component
export const attrtagItem = {
  render: (data) => {
    return `
    <button class="attrtag tag" id="attrtag" data-name="value" ${
      data.url ? `data-url="${data.url}"` : ""
    }>

      <span class="rank">
      $ {glyph.glyphSymbolNumber} 

        <span class="count label">${data.rank}</span>
      </span>
  
      <div class="label">
        <span class="text02" id="text02">${data.name}}</span>
      </div>
      <span class="icon">
        $ {glyph.glyphActionArrow} 
      </span>

    </button>
    `;
  }
};

// Updated attrtagItem component
export const attrtagFootnote = {
  render: (data) => {
    return `
      <button class="attrtag tag footnote" data-name="value" ${
        data.url ? `data-url="${data.url}"` : ""
      }>
        <div class="label">
          <span class="text02 truncate-text" id="text02">${data.name}</span>
        </div>
        <div class="icon">
          $ {glyph.glyphActionArrow}
        </div>
      </button>
    `;
  }
};

// Updated attrtagSource component
export const attrtagSource = {
  render: (data) => {
    return `
      <button class="attrtag tag ${data.extraClasses || ""}" data-name="value" ${
      data.url ? `data-url="${data.url}"` : ""
    }>
        ${
          data.logo
            ? `
          <div class="single-icon">
            <img src="${data.logo}" alt="${data.name} logo" class="source-logo">
          </div>
        `
            : ""
        }
        <div class="label">
          <span class="text02 truncate-text" id="text02">${data.name}</span>
        </div>
      </button>
    `;
  }
};

// Add event listeners for all attrtags
document.addEventListener("DOMContentLoaded", () => {
  // Handle attrtag clicks
  document.querySelectorAll(".attrtag").forEach((tag) => {
    tag.addEventListener("click", (e) => {
      const url = tag.dataset.url;
      if (url) {
        e.preventDefault();
        // Handle navigation or modal opening based on URL
        if (url.includes("/gallery/")) {
          // Open gallery modal
          openGalleryModal(url);
        } else {
          // Regular navigation
          window.location.href = url;
        }
      }
    });
  });
});

export const attrtagMore = {
  render: (data) => {
    const tags = data.tags || [];
    const tagsPerLine = 3; // Assuming 3 tags fit in one line
    const visibleTags = tags.slice(0, data.limit * tagsPerLine);
    const hiddenTagsCount = tags.length - visibleTags.length;
    const scoreResult = getStatsScore(parseInt(data.score));

    return `
  
              ${
                hiddenTagsCount > 0
                  ? `
                <button class="tag button-more">
                  $ {glyph.glyphSymbolPlus}
                  <span class="text02" id="count">
                    ${hiddenTagsCount}
                  </span>
                  <span class="text02">
                    more
                  </span>
                </button>
              `
                  : ""
              }
    
    
            }
            `;
  }
};
