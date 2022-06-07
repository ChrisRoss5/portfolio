export interface App {
  name: string;
  created: Date | null;
  lastUpdated: Date | null;
  users: number;
  links: {
    chrome?: string;
    firefox?: string;
    github?: string;
    download?: string;
  };
  tech: string[];
}

export type Apps = {
  [key in "extensions" | "themes" | "web" | "desktop"]: App[];
};

export interface Column {
  name: keyof App;
  unsortable?: boolean;
  browserAppSpecific?: boolean;
}

export const columns: Column[] = [
  { name: "name" },
  { name: "created" },
  { name: "lastUpdated", browserAppSpecific: true },
  { name: "users", browserAppSpecific: true },
  { name: "links", unsortable: true },
  { name: "tech" },
];

export const appTemplate: App = {
  name: "",
  created: null,
  lastUpdated: null,
  users: 0,
  links: { chrome: "", firefox: "", download: "" },
  tech: [],
};

export const apps: Apps = {
  extensions: [
    {
      name: "e-Dnevnik Plus",
      created: new Date("March 18, 2019"),
      lastUpdated: null,
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/bcnccmamhmcabokipgjechdeealcmdbe",
        github:
          "https://github.com/ChrisRoss5/e-Dnevnik-Plus",
      },
      tech: ["TypeScript"],
    },
    {
      name: "e-Dnevnik Plus za nastavnike",
      created: new Date("May 26, 2019"),
      lastUpdated: null,
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/jefappmpehdgllijkjpekdmkbmbigbnl",
      },
      tech: ["JavaScript"],
    },
    {
      name: "Gifs autoplay for Google™",
      created: new Date("August 31, 2020"),
      lastUpdated: null,
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mfaepkdaodjclepbclabjbigjeohfdje",
      },
      tech: ["JavaScript"],
    },
    {
      name: "SmoothZoom – Quick Page Zoom",
      created: new Date("March 20, 2022"),
      lastUpdated: null,
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/nlloamlgdioincflcopfgkbikjgaiihg",
      },
      tech: ["TypeScript"],
    },
    {
      name: "Search by Subtitles/CC for Youtube™",
      created: new Date("March 8, 2022"),
      lastUpdated: null,
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mapeihpdilaoodlmokclkmbabakgciad",
      },
      tech: ["TypeScript"],
    },
  ],
  themes: [],
  web: [],
  desktop: [],
};
