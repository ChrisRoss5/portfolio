export interface Project {
  img: string;
  name: string;
  created: Date;
  lastUpdated?: Date | null;
  weeklyUsers?: number;
  links: {
    chrome?: string;
    firefox?: string;
    github?: string;
    download?: string;
    home?: string;
  };
  tech: string[];
}

export type Projects = {
  [key in "extensions" | "themes" | "web" | "desktop"]: Project[];
};

export interface Column {
  name: keyof Project;
  unsortable?: boolean;
  isBrowserApp?: boolean;
}

export const columns: Column[] = [
  { name: "name" },
  { name: "created" },
  { name: "lastUpdated", isBrowserApp: true },
  { name: "weeklyUsers", isBrowserApp: true },
  { name: "links", unsortable: true },
  { name: "tech", unsortable: true },
];

export const projects: Projects = {
  extensions: [
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus",
      created: new Date("March 18, 2019"),
      lastUpdated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/bcnccmamhmcabokipgjechdeealcmdbe",
        github: "https://github.com/ChrisRoss5/e-Dnevnik-Plus/tree/master/dist",
      },
      tech: ["TypeScript"],
    },
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus za nastavnike",
      created: new Date("May 26, 2019"),
      lastUpdated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/jefappmpehdgllijkjpekdmkbmbigbnl",
        firefox:
          "https://addons.mozilla.org/en-US/firefox/addon/e-dnevnik-plus-za-nastavnike/",
        github: "https://github.com/ChrisRoss5/e-Dnevnik-Plus-za-nastavnike",
      },
      tech: ["JavaScript"],
    },
    {
      img: "Gifs autoplay for Google™",
      name: "Gifs autoplay for Google™",
      created: new Date("August 31, 2020"),
      lastUpdated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mfaepkdaodjclepbclabjbigjeohfdje",
        github: "https://github.com/ChrisRoss5/Google-gifs-autoplay",
      },
      tech: ["JSON"],
    },
    {
      img: "SmoothZoom – Quick Page Zoom",
      name: "SmoothZoom – Quick Page Zoom",
      created: new Date("March 20, 2022"),
      lastUpdated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/nlloamlgdioincflcopfgkbikjgaiihg",
        firefox:
          "https://addons.mozilla.org/en-US/firefox/addon/smoothzoom-quick-page-zoom/",
      },
      tech: ["TypeScript", "SCSS"],
    },
    {
      img: "Search by SubtitlesCC for Youtube™",
      name: "Search by Subtitles/CC for Youtube™",
      created: new Date("March 8, 2022"),
      lastUpdated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mapeihpdilaoodlmokclkmbabakgciad",
        github: "https://github.com/ChrisRoss5/Youtube-Search-by-Subtitles",
      },
      tech: ["TypeScript", "SCSS"],
    },
  ],
  themes: [
    {
      img: "SpaceX",
      name: "SpaceX Animated New Tab",
      created: new Date("Sep 13, 2020"),
      lastUpdated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/eggflkbkogehhhaekeghblbciboldiki",
        firefox:
          "https://addons.mozilla.org/en-US/firefox/addon/spacex-animated-new-tab/",
        github: "https://github.com/ChrisRoss5/SpaceX-Animated-New-Tab",
      },
      tech: ["TypeScript"],
    },
    {
      img: "SpaceX",
      name: "SpaceX Theme",
      created: new Date("Apr 24, 2022"),
      lastUpdated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/odflhffolibhhfnkjolnchpfpoedebem",
        firefox: "https://addons.mozilla.org/en-US/firefox/addon/spacex-theme/",
        github:
          "https://github.com/ChrisRoss5/SpaceX-Animated-New-Tab/tree/master/theme",
      },
      tech: ["JSON"],
    },
  ],
  web: [
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus",
      created: new Date("March 18, 2019"),
      links: {
        home: "https://ednevnik.plus",
        github:
          "https://github.com/ChrisRoss5/e-Dnevnik-Plus/tree/master/ednevnik.plus",
      },
      tech: ["TypeScript", "Vue", "SCSS", "Google Analytics", "Paypal"],
    },
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus App",
      created: new Date("Nov 11, 2021"),
      links: {
        github: "https://github.com/ChrisRoss5/e-Dnevnik-Plus",
      },
      tech: ["TypeScript", "Vue", "SCSS", "Google Analytics"],
    },
    {
      img: "Network Planner",
      name: "Network Planner",
      created: new Date("Jan 17, 2021"),
      links: { home: "https://network-planner.com" },
      tech: ["JavaScript", "Vue", "SCSS", "Firebase", "Paypal"],
    },
    {
      img: "Network Planner",
      name: "Network Planner App",
      created: new Date("Jan 17, 2021"),
      links: { home: "https://app.network-planner.com" },
      tech: ["JavaScript", "Vue", "SCSS", "Firebase"],
    },
    {
      img: "My Developer Portfolio",
      name: "My Developer Portfolio",
      created: new Date("May 1, 2022"),
      links: {
        home: "https://kristijan.pages.dev",
        github: "https://github.com/ChrisRoss5/portfolio",
      },
      tech: ["TypeScript", "Vue", "SCSS", "Cloudflare"],
    },
  ],
  desktop: [
    {
      img: "Evaluator",
      name: "Infokup Evaluator",
      created: new Date("Feb 21, 2019"),
      links: {
        download: "/projects/Evaluator.exe",
      },
      tech: ["Python", "Windows"],
    },
    {
      img: "Patterns",
      name: "Patterns",
      created: new Date("Jan 29, 2019"),
      links: {
        download: "/projects/Patterns.exe",
      },
      tech: ["Python", "Windows"],
    },
  ],
};
