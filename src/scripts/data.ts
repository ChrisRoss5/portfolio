export interface App {
  name: string;
  created: string;
  lastUpdated: string;
  users: number;
  links: { chrome?: string; firefox?: string; download?: string };
  tech: string;
}

export interface Projects {
  [key: string]: App[];
}

export interface Column {
  name: string;
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

export const itemTemplate: App = {
  name: "",
  created: "",
  lastUpdated: "",
  users: 0,
  links: { chrome: "", firefox: "", download: "" },
  tech: "",
};

export const projects: Projects = {
  extensions: [
    {
      name: "e-Dnevnik Plus",
      created: "18 March 2019",
      lastUpdated: "",
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/bcnccmamhmcabokipgjechdeealcmdbe",
      },
      tech: "TypeScript",
    },
    {
      name: "e-Dnevnik Plus za nastavnike",
      created: "26 May 2019",
      lastUpdated: "",
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/jefappmpehdgllijkjpekdmkbmbigbnl",
      },
      tech: "JavaScript",
    },
    {
      name: "Gifs autoplay for Google™",
      created: "31 August 2020",
      lastUpdated: "",
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mfaepkdaodjclepbclabjbigjeohfdje",
      },
      tech: "JavaScript",
    },
    {
      name: "SmoothZoom – Quick Page Zoom",
      created: "20 March 2022",
      lastUpdated: "",
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/nlloamlgdioincflcopfgkbikjgaiihg",
      },
      tech: "TypeScript",
    },
    {
      name: "Search by Subtitles/CC for Youtube™",
      created: "8 March 2022",
      lastUpdated: "",
      users: 0,
      links: {
        chrome:
          "https://chrome.google.com/webstore/detail/mapeihpdilaoodlmokclkmbabakgciad",
      },
      tech: "TypeScript",
    },
  ],
  themes: [],
};
