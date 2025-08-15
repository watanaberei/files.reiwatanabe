// /projectData.js
// Nested structure: accountName -> projectName -> fields




// /projectData.js
// Top-level keys are accountIds. Each account holds any number of projects.
// Fields renamed to accountId (was companyId).

// accountId:
    // projectId:
    // type:
    // category:
    // accountName:
    // projectName: 
    // projectDescription:
    // fileKey:
    // fileName:
    // attributes:

export const projectData = {
  ATT: {
    "Low-Midfunnel": {
      accountId: "ATT",
      projectId: "Low-Midfunnel",
      type: "design",
      category: "Working File",
      accountName: "AT&T",
      projectName: "Low-Midfunnel",
      projectDescription: "Low-Midfunnel",
      fileKey: "11dDn02IJv75bAJC1L2hGu",
      fileName: "low-midfunnel.html",
      attributes: ["Midfunnel", "UX/UI", "CMS", "Strategy"],    // optional display name
    },
    "Casestudy": {
      accountId: "ATT",
      projectId: "Casestudy",
      type: "prototype",
      category: "Working File",
      accountName: "AT&T",
      projectName: "Casestudy",
      projectDescription: "Casestudy",
      fileKey: "11dDn02IJv75bAJC1L2hGu",
      fileName: "casestudy.html",
      attributes: ["Case Study", "UX/UI"]
      // accountName/groupTitle optional; will inherit from the first project if omitted
    }
  },



  ChromeOS: {
    "Dev-Log": {
      accountId: "ChromeOS",
      projectId: "Dev-Log",
      type: "design",
      category: "Working File",
      accountName: "ChromeOS",
      projectName: "Developers Log",
      projectDescription: "Developers Log",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "dev-log.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },



  TacoBell: {
    "Discovery": {
      accountId: "TB",
      projectId: "Discovery",
      type: "design",
      category: "Working File",
      accountName: "TacoBell",
      projectName: "Discovery",
      projectDescription: "Discovery",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    },
    "Brandhub": {
      accountId: "TB",
      projectId: "Brandhub",
      type: "design",
      category: "Working File",
      accountName: "TacoBell",
      projectName: "Brandhub",
      projectDescription: "Discovery",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    },
    "TokenizedAnimation": {
      accountId: "TB",
      projectId: "TokenMotion",
      type: "design",
      category: "Prototype",
      accountName: "TacoBell",
      projectName: "Tokenized Animation",
      projectDescription: "Tokenized Animation",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },


  
  SEA: {
    "Toolkit": {
      accountId: "SEA",
      projectId: "Toolkit",
      type: "design",
      category: "Working File",
      accountName: "Samsung",
      projectName: "CRM Toolkit",
      projectDescription: "Building tool to build Samsung CRM",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },


  
  Ourrs: {
    "Ecommerce": {
      accountId: "Ourrs",
      projectId: "Ecommerce",
      type: "design",
      category: "Working File",
      accountName: "Ourrs",
      projectName: "Ecommerce",
      projectDescription: "Ecommerce",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    },
    "Prototype": {
      accountId: "Ourrs",
      projectId: "Prototype",
      type: "prototype",
      category: "Demo",
      accountName: "Ourrs",
      projectName: "Prototype",
      projectDescription: "Prototype",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },



  FSY: {
    "Booking": {
      accountId: "FSY",
      projectId: "Booking",
      type: "design",
      category: "Working File",
      accountName: "FSY",
      projectName: "Self-Booking",
      projectDescription: "Designing Four Seasons Yatch’s first Self Booking experiences",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },


  ABG: {
    "Design System": {
      accountId: "ABG",
      projectId: "Design System",
      type: "design",
      category: "Design System",
      accountName: "Avis Budget Group",
      projectName: "Tokenized Animation System",
      projectDescription: "A multi-brand, modularized global design library.",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
      accountName: "ABG",
      groupTitle: "Reimagining"
    },
    "Redesign": {
      accountId: "ABG",
      projectId: "Redesign",
      type: "design",
      category: "Working File",
      accountName: "Avis Budget Group",
      projectName: "Redesign",
      projectDescription: "A vision for two brands: Avis and Budget",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },

          

  Medialink: {
    "Live": {
      accountId: "Medialink",
      projectId: "Live",
      type: "prototype",
      category: "Casestudy",
      accountName: "Medialink",
      projectName: "Live",
      projectDescription: "Live streaming for agencies, hosted by agencies",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },



  Neumad: {
    "Places": {
      accountId: "Neumad",
      projectId: "Places",
      type: "design",
      category: "Working File",
      accountName: "Neumad",
      projectName: "Places",
      projectDescription: "Discovery endorsed places",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },



  Medialink: {
    "Live": {
      accountId: "Medialink",
      projectId: "Live",
      type: "prototype",
      category: "Casestudy",
      accountName: "Medialink",
      projectName: "Live",
      projectDescription: "Live streaming for agencies, hosted by agencies",
      fileKey: "4V95AGqunAQzgrS48AT3mw",
      fileName: "discovery.html",
      attributes: ["Systems", "Docs", "Exploration"],
    }
  },

  




  // Add more accounts/projects freely; the container is fully dynamic.
};






// export const projectData = {
//   ATT: {
//     "Low-Midfunnel": {
//       companyId: "ATT",
//       projectId: "Low-Midfunnel",
//       accountName: "AT&T",
//       projectName: "Low-Midfunnel",
//       projectDescription: "Low-Midfunnel",
//       type: "design",
//       category: "Working File",
//       fileKey: "11dDn02IJv75bAJC1L2hGu",
//       fileName: "low-midfunnel.html",
//       attributes: ["Midfunnel", "UX/UI", "CMS", "Strategy"]
//     },
//     "Case Study": {
//       companyId: "ATT",
//       projectId: "casestudy",
//       accountName: "AT&T",
//       projectName: "Casestudy",
//       projectDescription: "Low-Midfunnel",
//       type: "design",
//       category: "Case Study",
//       fileKey: "11dDn02IJv75bAJC1L2hGu",
//       fileName: "reimagining.html",
//       attributes: ["Midfunnel", "UX/UI", "CMS", "Strategy"]
//     }
//   },
//   ChromeOS: {
//     "Dev-Log": {
//       companyId: "ChromeOS",
//       projectId: "Dev-Log",
//       accountName: "ChromeOS",
//       projectName: "Developers Log",
//       projectDescription: "Developers Log",
//       type: "design",
//       category: "Working File",
//       fileKey: "4V95AGqunAQzgrS48AT3mw",
//       fileName: "dev-log.html",
//       attributes: ["Systems", "Docs", "Exploration"]
//     }
//   }

//   // Add more companies/projects in the same pattern:
//   // CompanyName: {
//   //   "ProjectName": { companyId, projectId, type, fileKey, fileName, attributes }
//   // }
// };
