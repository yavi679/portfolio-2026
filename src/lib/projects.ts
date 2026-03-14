export interface Highlight {
  title: string;
  imageUrl?: string;
  vimeoId?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: Highlight[];
  publications?: string[];
}

export interface CompanyGroup {
  company: string;
  projects: Project[];
}

const placeholderDescription =
  "Delivered 10+ smart templates as premium content offered via M365 consumer subscription. We were challenged to design high value consumer templates, using Wolfram data through a new capability called 'datatypes'.";

const placeholderHighlights: Highlight[] = [
  { title: "Defining the concept" },
  { title: "User research" },
  { title: "Template architecture" },
  { title: "Data integration" },
  { title: "Visual design system" },
  { title: "Prototyping & testing" },
  { title: "Launch & impact" },
];

const placeholderPublications = ["CNET", "The Verge", "TechCrunch"];

function placeholder(id: string, title: string): Project {
  return {
    id,
    title,
    description: placeholderDescription,
    highlights: placeholderHighlights,
    publications: placeholderPublications,
  };
}

export const projectGroups: CompanyGroup[] = [
  {
    company: "Adobe Firefly",
    projects: [
      placeholder("generative-sfx", "Generative sfx"),
      placeholder("generative-speech", "Generative speech"),
      placeholder("generative-video", "Generative video"),
    ],
  },
  {
    company: "Microsoft Outlook",
    projects: [
      placeholder("3d-illustrations", "3D illustrations"),
      placeholder("expressive-theming", "Expressive theming"),
      placeholder("reactions", "Reactions"),
    ],
  },
  {
    company: "Microsoft Excel",
    projects: [
      placeholder("smart-templates", "Smart templates"),
      placeholder("ux-redesigns", "Ux redesigns"),
    ],
  },
];

export const aboutProject: Project = {
  id: "about",
  title: "About Vikas",
  description: placeholderDescription,
  highlights: placeholderHighlights,
  publications: placeholderPublications,
};

export function getAllProjects(): Project[] {
  return [aboutProject, ...projectGroups.flatMap((g) => g.projects)];
}
