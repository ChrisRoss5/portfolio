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
  description: string;
  screenshot: string;
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
      description: /* html */ `
      A browser extension containing two separate apps:
      <b>e-Dnevnik Plus Classic</b> and <b>e-Dnevnik Plus App.</b><br><br>
      <b>e-Dnevnik Plus Classic</b> injects additional features
      into the Croatian e-Class register “e-Dnevnik” to help
      students throughout primary and secondary school.
      <b>e-Dnevnik Plus App</b> is my own version of e-Dnevnik that runs as a local page.
      It has many more features, however, the user interface is completely different
      and modernized compared to the Classic version.`,
      screenshot: "e-Dnevnik Plus popup",
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
      description: /* html */ `
      A browser extension created for teachers who use their version of e-Dnevnik.
      It injects additional features to help teachers grade their students.`,
      screenshot: "e-Dnevnik Plus za nastavnike",
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
      description: /* html */ `
      A browser extension that autoplays gifs on Google™ Search Images.`,
      screenshot: "Gifs autoplay for Google™",
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
      description: /* html */ `
      A browser extension that enables you to zoom anywhere, on any page,
      without changing the page layout! Simply position the cursor and use the mouse wheel
      to zoom in/out at the desired location. You can compare this extension to
      pinch-to-zoom functionality on touch screens, or the Windows Magnifier.
      It is the most advanced of all my apps
      and is reaching browsers' limits in several ways. I talk through them in detail on the
      extension's test page, and you don't want to miss out if you love web tech!`,
      screenshot: "SmoothZoom – Quick Page Zoom",
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
      description: /* html */ `
      A browser extension that enables you to search for videos on Youtube™
      by Subtitles/CC in a specified language. Once you select the language,
      the extension remembers it and highlights all video thumbnails that
      have CC in that language, anywhere on youtube.`,
      screenshot: "Search by SubtitlesCC for Youtube™",
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
      description: /* html */ `
      This is an extension but I labeled it as a theme because its main purpose is decorative.
      It replaces every New Tab with my SpaceX page, on top of which are
      recently closed tabs and useful chrome shortcuts.
      You can control the video speed with mouse wheel.`,
      screenshot: "SpaceX Animated New Tab",
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
      description: /* html */ `
      A theme encompassing everything into a beautiful SpaceX atmosphere.`,
      screenshot: "SpaceX Theme",
    },
  ],
  web: [
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus Home",
      created: new Date("March 18, 2019"),
      links: {
        home: "https://ednevnik.plus",
        github:
          "https://github.com/ChrisRoss5/e-Dnevnik-Plus/tree/master/ednevnik.plus",
      },
      tech: ["TypeScript", "Vue", "SCSS", "Google Analytics", "Paypal"],
      description: /* html */ `
      The homepage of e-Dnevnik Plus, where you can find all information about it and its versions.`,
      screenshot: "e-Dnevnik Plus Home",
    },
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus App",
      created: new Date("Nov 11, 2021"),
      links: {
        github: "https://github.com/ChrisRoss5/e-Dnevnik-Plus",
      },
      tech: ["TypeScript", "Vue", "SCSS", "Google Analytics"],
      description: /* html */ `
      <b>e-Dnevnik Plus App</b> is my own version of e-Dnevnik that runs as a local page.
      It is my largest project so far.
      You can find the video tour on the homepage - it is the coolest.`,
      screenshot: "e-Dnevnik Plus App",
    },
    {
      img: "Network Planner",
      name: "Network Planner Home",
      created: new Date("Jan 17, 2021"),
      links: { home: "https://network-planner.com" },
      tech: ["JavaScript", "Vue", "SCSS", "Firebase", "Paypal"],
      description: /* html */ `
      The homepage of Network Planner, where you can find all information about it,
      purchase plans, and manage your user account.
      `,
      screenshot: "Network Planner Home",
    },
    {
      img: "Network Planner",
      name: "Network Planner App",
      created: new Date("Jan 17, 2021"),
      links: { home: "https://app.network-planner.com" },
      tech: ["JavaScript", "Vue", "SCSS", "Firebase"],
      description: /* html */ `
      A web-mapping software for organizing locations into groups.
      By analyzing groups' statistics (computed properties of locations),
      the app assists in collecting and presenting data into meaningful
      actionable insights for businesses.`,
      screenshot: "Network Planner App",
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
      description: /* html */ `
      This is where you're at! I googled "kr logo", downloaded a .png, converted it to .svg,
      and modified the svg.`,
      screenshot: "My Developer Portfolio",
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
      description: /* html */ `
      A desktop application for evaluating competitive programming solutions written
      in C, C++, and Python. Used for the national Infokup coding competition in the
      Algorithms category. The executable has to be in the same directory with solutions
      and the test folder. Created in Python with Tkinter GUI module.`,
      screenshot: "Evaluator",
    },
    {
      img: "Patterns",
      name: "Patterns",
      created: new Date("Jan 29, 2019"),
      links: {
        download: "/projects/Patterns.exe",
      },
      tech: ["Python", "Windows"],
      description: /* html */ `
      My first GUI App! Fun with patterns! Created in Python with Tkinter GUI module.`,
      screenshot: "Patterns",
    },
  ],
};
