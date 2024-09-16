export interface Project {
  img: string;
  name: string;
  created: Date;
  updated?: Date | null;
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
  [key in "extensions" | "web" | "desktop"]: Project[];
};

export interface Column {
  name: keyof Project;
  unsortable?: boolean;
  browserOnly?: boolean;
}

export const columns: Column[] = [
  { name: "name" },
  { name: "created" },
  { name: "updated", browserOnly: true },
  { name: "weeklyUsers", browserOnly: true },
  { name: "links", unsortable: true },
  { name: "tech", unsortable: true },
];

export const projects: Projects = {
  extensions: [
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus",
      created: new Date("March 18, 2019"),
      updated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/bcnccmamhmcabokipgjechdeealcmdbe",
        github: "https://github.com/ChrisRoss5/e-Dnevnik-Plus/tree/master/dist",
      },
      tech: ["TypeScript"],
      description: /* html */ `
      A browser extension containing two separate apps for e-Dnevnik (national e-Class register):
      <ul>
        <li><b>e-Dnevnik Plus App</b> transforms e-Dnevnik into a standalone app,
        featuring a complete redesign aimed at aiding students
        throughout primary and secondary school.</li>
        <li><b>e-Dnevnik Plus Classic</b> enhances the original e-Dnevnik with
        additional features injected into pages.</li>
      </ul>`,
      screenshot: "e-Dnevnik Plus popup",
    },
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus za nastavnike",
      created: new Date("May 26, 2019"),
      updated: null,
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
      A browser extension for teachers, enhancing their grading process with
      additional functionalities to better assess students’ performance and save time.`,
      screenshot: "e-Dnevnik Plus za nastavnike",
    },
    {
      img: "Gifs autoplay for Google™",
      name: "Gifs autoplay for Google™",
      created: new Date("August 31, 2020"),
      updated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mfaepkdaodjclepbclabjbigjeohfdje",
        github: "https://github.com/ChrisRoss5/Google-gifs-autoplay",
      },
      tech: ["TypeScript"],
      description: /* html */ `
      A browser extension that autoplays gifs on Google™ Search Images, while also improving static image quality.`,
      screenshot: "Gifs autoplay for Google™",
    },
    {
      img: "SmoothZoom – Quick Page Zoom",
      name: "SmoothZoom – Quick Page Zoom",
      created: new Date("March 20, 2022"),
      updated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chromewebstore.google.com/detail/smoothzoom-%E2%80%93-quick-page-z/nlloamlgdioincflcopfgkbikjgaiihg",
        firefox:
          "https://addons.mozilla.org/en-US/firefox/addon/smoothzoom-quick-page-zoom/",
        home: "https://zoom.k1k1.dev",
        github: "https://github.com/ChrisRoss5/SmoothZoom",
      },
      tech: ["TypeScript", "SCSS"],
      description: /* html */ `
      A browser extension that enables zooming into content (mouse pinch-to-zoom).
      Try now without installation: <a class="new-tab-link" href="https://zoom.k1k1.dev/#author" target="_blank">
      zoom.k1k1.dev</a>. Deployed on Cloudflare Pages.`,
      screenshot: "SmoothZoom – Quick Page Zoom",
    },
    {
      img: "SpaceX",
      name: "SpaceX Theme",
      created: new Date("Apr 24, 2022"),
      updated: null,
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
    {
      img: "SpaceX",
      name: "SpaceX Animated New Tab",
      created: new Date("Sep 13, 2020"),
      updated: null,
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
      A browser extension that replaces every New Tab with my SpaceX page,
      containing recently closed tabs and useful chrome shortcuts.`,
      screenshot: "SpaceX Animated New Tab",
    },
    {
      img: "Search by SubtitlesCC for Youtube™",
      name: "Search by Subtitles/CC for Youtube™",
      created: new Date("March 8, 2022"),
      updated: null,
      weeklyUsers: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mapeihpdilaoodlmokclkmbabakgciad",
        github: "https://github.com/ChrisRoss5/Youtube-Search-by-Subtitles",
      },
      tech: ["TypeScript", "SCSS"],
      description: /* html */ `
      A browser extension that adds a search option to find videos with subtitles in the selected language.`,
      screenshot: "Search by SubtitlesCC for Youtube™",
    },
  ],
  web: [
    {
      img: "Algebra",
      name: "Movie Web Shop",
      created: new Date("Apr 29, 2024"),
      links: {
        home: "https://mws.k1k1.dev",
        github: "https://github.com/ChrisRoss5/movie-web-shop-spring",
      },
      tech: [
        "Spring",
        "JavaScript",
        "Java",
        "SqlServerDatabase",
        "Tailwind",
        "DaisyUI",
        "Docker",
      ],
      description: /* html */ `
      College project (Java web programming S6): A dockerized Java Spring web shop,
      deployed on GCP App Engine. Supports anonymous browsing, customer & admin roles,
      cart management, purchase history & more.`,
      screenshot: "Movie Web Shop",
    },
    {
      img: "Kiki Storage",
      name: "Kiki Storage",
      created: new Date("Oct 23, 2023"),
      links: {
        home: "https://storage.k1k1.dev",
        github: "https://github.com/ChrisRoss5/kiki-storage-web",
      },
      tech: ["Vite", "TypeScript", "Vue", "Tailwind", "PostCSS", "DaisyUI", "Firebase"],
      description: /* html */ `
      College project (Final thesis): A cloud storage app focused on front-end,
      utilizing Firebase to its maximum extent for a real-time,
      highly customizable cloud file explorer.`,
      screenshot: "Kiki Storage Web",
    },
    {
      img: "e-Dnevnik Plus",
      name: "e-Dnevnik Plus Home",
      created: new Date("March 18, 2019"),
      links: {
        home: "https://ednevnik.plus",
        github:
          "https://github.com/ChrisRoss5/e-Dnevnik-Plus/tree/master/ednevnik.plus",
      },
      tech: [
        "Webpack",
        "TypeScript",
        "Vue",
        "SCSS",
        "Google Analytics",
        "Paypal",
      ],
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
      tech: ["Webpack", "TypeScript", "Vue", "SCSS", "Google Analytics"],
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
      tech: [
        "Webpack",
        "JavaScript",
        "Vue",
        "SCSS",
        "Firebase",
        "Google Analytics",
        "Paypal",
      ],
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
      tech: [
        "Webpack",
        "JavaScript",
        "Vue",
        "SCSS",
        "Firebase",
        "Google Analytics",
      ],
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
        home: "https://k1k1.dev",
        github: "https://github.com/ChrisRoss5/portfolio",
      },
      tech: [
        "Webpack",
        "TypeScript",
        "Vue",
        "SCSS",
        "Cloudflare",
        "Google Analytics",
      ],
      description: /* html */ `
      Kristijan Rosandić — Software Engineer Portfolio. Deployed on Cloudflare Pages.`,
      screenshot: "My Developer Portfolio",
    },
    {
      img: "Algebra",
      name: "Project ASIBP",
      created: new Date("October 11, 2022"),
      links: {
        home: "https://asibp.k1k1.dev",
        github: "https://github.com/ChrisRoss5/firebase-auth",
      },
      tech: ["JavaScript", "Firebase", "IdentityPlatform"],
      description: /* html */ `
      College project (Authentication systems and databases S3): A web app providing as many
      authentication methods as possible using Google Identity Platform and Firebase.
      Custom OIDC provider included.`,
      screenshot: "ASIBP Project",
    },
    {
      img: "Algebra",
      name: "Project RWA",
      created: new Date("June 24, 2023"),
      links: {
        home: "https://rwa.k1k1.dev",
        github: "https://github.com/ChrisRoss5/RwaMovies",
      },
      tech: [
        "NETCore",
        "CSharp",
        "JavaScript",
        "jQuery",
        "Bootstrap",
        "Swagger",
        "GoogleCloudRun",
        "AzureSqlServerDatabase",
        "Azure",
        "SendGrid",
        "Docker",
      ],
      description: /* html */ `
      College project (Development of web applications S4): A dockerized ASP.NET Core 6 app,
      deployed on GCP Cloud Run. Supports user & admin roles with CRUD for many entities,
      full API support & much more.`,
      screenshot: "RWA Project",
    },
    {
      img: "Algebra",
      name: "Project SUPIT",
      created: new Date("October 19, 2022"),
      links: {
        home: "https://supit.k1k1.dev",
        github: "https://github.com/ChrisRoss5/supit-projekt",
      },
      tech: [
        "Vite",
        "TypeScript",
        "jQuery",
        "Vue",
        "React",
        "Svelte",
        "Bootstrap",
        "Tailwind",
        "PostCSS",
        "Cloudflare",
      ],
      description: /* html */ `
      College project (Internet technology S3): 6 versions of the same web app -
      built and compared UX & DX: jQuery, Vue, Vue Full, React, React Full, Svelte.
      Deployed on Cloudflare Pages.`,
      screenshot: "SUPIT Project",
    },
  ],
  desktop: [
    {
      img: "Kiki Storage",
      name: "Kiki Storage",
      created: new Date("Jun 23, 2024"),
      links: {
        github: "https://github.com/ChrisRoss5/kiki-storage-android",
      },
      tech: ["Kotlin", "Firebase", "Android"],
      description: /* html */ `
      College project (App development for mobile devices S5):
      A cloud storage app with excellent file management, using storage and camera access
      for file uploads and attachments for chat with Gemini AI.`,
      screenshot: "Kiki Storage Android",
    },
    {
      img: "Evaluator",
      name: "Infokup Evaluator",
      created: new Date("Feb 21, 2019"),
      links: {
        download: "/apps/Evaluator.exe",
      },
      tech: ["Python", "Windows"],
      description: /* html */ `
      A Tkinter desktop app for evaluating competitive programming solutions written
      in C, C++, and Python. Used for the national Infokup coding competition in the Algorithms category.`,
      screenshot: "Evaluator",
    },
    {
      img: "Patterns",
      name: "Patterns",
      created: new Date("Jan 29, 2019"),
      links: {
        download: "/apps/Patterns.exe",
      },
      tech: ["Python", "Windows"],
      description: /* html */ `
      My first GUI app! It shows all combinations for unlocking an Android phone, with display options and more features.
      Built with the Tkinter GUI module and SQLite database for saving user settings.`,
      screenshot: "Patterns",
    },
    {
      img: "Algebra",
      name: "TradingView Ideas",
      created: new Date("Sep 8, 2023"),
      links: {
        github: "https://github.com/ChrisRoss5/JavaProject",
      },
      tech: ["Java", "SqlServerDatabase", "RSS", "Desktop"],
      description: /* html */ `
      College project (Java programming S4): A Java Swing app fetching
      <a class="new-tab-link" href="https://www.tradingview.com/widget/" target="_blank">TradingView</a> data via RSS,
      with a fully responsive design. Supports user & admin roles with CRUD for ideas, authors, symbols & markets.`,
      screenshot: "TradingView Ideas",
    },
    {
      img: "Algebra",
      name: "Fifa World Cup",
      created: new Date("Aug 11, 2023"),
      links: {
        github: "https://github.com/ChrisRoss5/OOP.NET-projects",
        download: "https://github.com/ChrisRoss5/OOP.NET-projects/releases",
      },
      tech: ["NETCore", "CSharp", "Windows"],
      description: /* html */ `
      College project (OOP.NET S4): Two Windows apps with shared preferences,
      showcasing FIFA World Cup 2016 results. Built with .NET Core 6 using
      Windows Forms and Windows Presentation Foundation (WPF).`,
      screenshot: "OOP.NET Projects",
    },
  ],
};
