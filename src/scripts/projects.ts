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
      A browser extension created for teachers who use their version of e-Dnevnik.
      It injects additional features to help teachers grade their students.`,
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
      A browser extension that autoplays gifs on Google™ Search Images.`,
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
      A browser extension that enables zooming anywhere, on any page,
      without changing the page layout! Simply position the cursor and use the mouse wheel
      to zoom in/out at the desired location. You can compare this extension to
      pinch-to-zoom functionality on touch screens, or the Windows Magnifier.
      It is my most advanced app and reaches several browser limits.
      I talk through them in detail on the extension's
      <a class="new-tab-link" href="https://zoom.k1k1.dev/#author" target="_blank">
      test page</a>`,
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
      A browser extension that replaces every New Tab with my SpaceX page, containing
      recently closed tabs and useful chrome shortcuts.
      You can control the video speed with mouse wheel.`,
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
      A browser extension that enables searching for videos on Youtube™
      by Subtitles/CC in a specified language. Once you select a language,
      the extension stores it and highlights all video thumbnails that
      have CC in the specified language, anywhere on Youtube.`,
      screenshot: "Search by SubtitlesCC for Youtube™",
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
      This is where you're at! I googled "kr logo", downloaded a .png, converted it to .svg,
      and modified the svg.`,
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
      tech: ["JavaScript", "Firebase"],
      description: /* html */ `
      A project from ASIBP (Autentikacijski sustavi i baze podataka / Authentication systems and databases) course.
      The goal is to provide as many authentication methods as possible.
      After signing in, users can save a message on the Firebase Realtime Database.`,
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
        "AzureSqlServerDatabase",
        "Azure",
        "SendGrid",
      ],
      description: /* html */ `
      A project from RWA (Razvoj web aplikacija / Web app development) course.
      The goal is to master ASP.NET Core 6.0 and C# 10.0 by creating a full-stack
      web application that is connected to a database.
      The app is using the MVC pattern and is built with Razor Pages.
      Some of the dependencies are Swashbuckle (Swagger for API), AutoMapper, JwtBearer, and EntityFrameworkCore.
      It has been deployed to Azure (App Service, SQL Server, SQL Database)
      and is using SendGrid, the world's largest cloud-based email delivery platform. `,
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
      A project from SUPIT (Standardi u primjeni internetske tehnologije / Web standards) course.
      The goal is to learn Bootstrap and jQuery by cloning a website
      representing Algebra University from a video. I recreated the website
      multiple times with other frameworks and libraries to test their performance.`,
      screenshot: "SUPIT Project",
    },
  ],
  desktop: [
    {
      img: "Evaluator",
      name: "Infokup Evaluator",
      created: new Date("Feb 21, 2019"),
      links: {
        download: "/apps/Evaluator.exe",
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
        download: "/apps/Patterns.exe",
      },
      tech: ["Python", "Windows"],
      description: /* html */ `
      My first GUI App! Created in Python with Tkinter GUI module.`,
      screenshot: "Patterns",
    },
    {
      img: "Algebra",
      name: "TradingView Ideas",
      created: new Date("Sep 8, 2023"),
      links: {
        github: "https://github.com/ChrisRoss5/JavaProject",
      },
      tech: ["Java", "SqlServerDatabase"],
      description: /* html */ `
      A project from Java 1 course. The goal is to learn Java by creating
      a desktop application that is connected to SQL Server database. With the freedom to
      choose a topic, I decided to create a desktop application that fetches data from
      <a class="new-tab-link" href="https://www.tradingview.com/widget/" target="_blank">TradingView</a>,
      with fully responsive design.
      Some of the dependencies are Jsoup, SwingX, jBCrypt, and Lombok.`,
      screenshot: "TradingView Ideas",
    },
    {
      img: "Algebra",
      name: "OOP.NET Projects",
      created: new Date("Aug 11, 2023"),
      links: {
        github: "https://github.com/ChrisRoss5/OOP.NET-projects",
        download: "https://github.com/ChrisRoss5/OOP.NET-projects/releases",
      },
      tech: ["NETCore", "CSharp", "Windows"],
      description: /* html */ `
      Two projects from OOP.NET course.
      The goal is to learn Object-Oriented Programming in .NET Core 6 using
      Windows Forms (WinForms - first project) and Windows Presentation Foundation
      (WPF - second project).
      Depending on the settings, apps can fetch data from the API or from the local files.
      The only dependencies are Newtonsoft.Json and RestSharp.`,
      screenshot: "OOP.NET Projects",
    },
  ],
};
