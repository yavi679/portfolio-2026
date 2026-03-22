export interface Project {
  id: string;
  title: string;
  year: string;
  hook: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  bg?: string;
  duration?: number; // ms, for image/gif auto-advance
}

export interface CompanyGroup {
  company: string;
  logoUrl: string;
  role: string;
  years: string;
  description: string;
  projects: Project[];
}

export interface WorkEntry {
  company: string;
  logoUrl?: string;
  logoFallback?: string;
  logoRounded?: boolean;
  role: string;
  years: string;
  description?: string;
}

export const workHistory: WorkEntry[] = [
  {
    company: "Adobe Firefly",
    logoUrl: "/projects/app logos/adobe firefly.png",
    role: "Product designer, GenAI",
    years: "2023–2025",
    description:
      "Led 0→1 design of generative audio tools (speech, SFX, avatars) and multi-model UX systems for Adobe Firefly.",
  },
  {
    company: "Microsoft Outlook",
    logoUrl: "/projects/app logos/microsoft outlook.png",
    role: "Product designer",
    years: "2020–2022",
    description:
      "Drove 3D illustrations, expressive theming system, and reactions UX across all Outlook platforms.",
  },
  {
    company: "Microsoft Excel",
    logoUrl: "/projects/app logos/microsoft excel.png",
    role: "UX Designer",
    years: "2018–2019",
    description:
      "Designed Smart Templates with Wolfram data integration and modernized core Excel web experiences.",
  },
  {
    company: "Carnegie Mellon University",
    logoUrl: "/projects/app logos/CMU.png",
    logoRounded: false,
    role: "M.Des",
    years: "2016–2018",
  },
];

export const projectGroups: CompanyGroup[] = [
  {
    company: "Adobe Firefly",
    logoUrl: "/projects/app logos/adobe firefly.png",
    role: "Product designer",
    years: "2023–2025",
    description: "Led 0→1 design of generative audio tools and multi-model UX systems.",
    projects: [
      {
        id: "generative-speech",
        title: "Generative Speech",
        year: "2025",
        hook: "Bringing creative direction to AI-generated speech, not just conversion from text to audio.",
        description:
          "Led the 0 to 1 design of a generative speech tool that turns text into expressive audio. Introduced voice casting (200+ voices), controls like speed and pitch, and emotion tagging mapped to the waveform to shape tone and delivery. Enabled fast iteration with preview before full generation and added editing tools like pronunciation overrides and find and replace.",
        videoUrl: "/projects/Gen-audio/02-Generative speech.mp4",
        bg: "#000000",
      },
      {
        id: "generative-sfx",
        title: "Generative SFX",
        year: "2024, 2025",
        hook: "Turning sound design into a performance, not a technical workflow.",
        description:
          "Led the 0 to 1 design of a generative sound effects tool for composing audio directly on video. Introduced voice performance, allowing users to control timing and energy through mic input. Designed timeline interactions from scratch, including placement, scrubbing, and iteration, with no prior patterns to rely on.",
        videoUrl: "/projects/Gen-audio/01-Generative sound effects.mp4",
        bg: "#000000",
      },
      {
        id: "ai-avatars",
        title: "AI Avatars",
        year: "2024",
        hook: "Making video creation fast, repeatable, and accessible without production overhead.",
        description:
          "Led the 0 to 1 design of an AI avatar video tool for professionals and marketers. Built a system with 40 avatars, 20 languages, and flexible background controls. Focused on speed, simplicity, and repeatability for non-expert users while expanding Adobe's generative capabilities into video.",
        bg: "#111827",
      },
      {
        id: "generative-media",
        title: "Generative Media",
        year: "2023",
        hook: "Exploring the convergence of generative AI across images, video, and audio at Adobe Firefly.",
        description:
          "Explored multi-modal generative experiences spanning image, video, and audio within Adobe Firefly. Defined cross-surface patterns that allowed creators to move fluidly between modalities without losing context or creative intent.",
        bg: "#1f2937",
      },
    ],
  },
  {
    company: "Microsoft Outlook",
    logoUrl: "/projects/app logos/microsoft outlook.png",
    role: "Product designer",
    years: "2020–2022",
    description: "Drove 3D illustrations, expressive theming, and reactions UX.",
    projects: [
      {
        id: "3d-illustrations",
        title: "3D Illustrations",
        year: "2021, 2022",
        hook: "Reimagining empty states and system moments through expressive 3D illustration.",
        description:
          "Led the design of a 3D illustration system for Outlook across all endpoints. Created a library of expressive, on-brand assets for empty states, onboarding, and error moments — replacing flat, generic imagery with illustrations that felt native to each platform.",
        videoUrl: "/projects/3d-illustrations/01-3D Illustrations.mp4",
        bg: "#f4f4f4",
      },
      {
        id: "expressive-theming",
        title: "Expressive Theming",
        year: "2022",
        hook: "Giving 350 million Outlook users the power to make their inbox feel like theirs.",
        description:
          "Delivered 17 themes in collaboration with M365 partners. Led and evolved Outlook's theming story with the design systems team to define a coherent solution. Redefined Outlook's elevation, layering, and color system to be consistent and polished on every platform.",
        imageUrl: "/projects/expressive-theming/02-Cross platform.png",
        bg: "#f4f4f4",
      },
      {
        id: "reactions",
        title: "Reactions",
        year: "2020",
        hook: "Contextualizing social reactions for professional email, from concept to cross-platform delivery.",
        description:
          "Collaborated closely with M365 partners to develop reactions UX grounded in Outlook's user jobs. Contextualized reactions in the email experience and delivered a considered visual, interaction, and motion experience across desktop and mobile.",
        videoUrl: "/projects/reactions/01-Visual refinements.mov",
        bg: "#f4f4f4",
      },
    ],
  },
  {
    company: "Microsoft Excel",
    logoUrl: "/projects/app logos/microsoft excel.png",
    role: "UX Designer",
    years: "2018–2019",
    description: "Designed Smart Templates and modernized core Excel web experiences.",
    projects: [
      {
        id: "smart-templates",
        title: "Smart Templates",
        year: "2019",
        hook: "Turning Microsoft 365 into a personal productivity platform through intelligent, data-connected templates.",
        description:
          "Delivered 10+ smart templates as premium content offered via M365 consumer subscription. Designed high-value consumer templates using Wolfram data through a new capability called datatypes, enabling templates to update automatically with real-world information.",
        videoUrl: "/projects/smart-templates/01-Excel x Wolfram templates.mp4",
        bg: "#000000",
      },
      {
        id: "ux-redesigns",
        title: "UX Redesigns",
        year: "2018",
        hook: "Modernizing Excel's core web experiences to reduce friction and elevate everyday workflows.",
        description:
          "Re-designed filtering and shortcuts UX for Excel on the web. As an opportunity to modernize several core experiences, the goal was to elevate user delight and boost product promotability through cleaner interaction patterns and a more cohesive visual language.",
        videoUrl: "/projects/ux-redesigns/01-Core feature redesigns.mp4",
        bg: "#ffffff",
      },
    ],
  },
];

export function getAllProjects(): Project[] {
  return projectGroups.flatMap((g) => g.projects);
}

export function getProjectGroup(id: string): CompanyGroup | null {
  return projectGroups.find((g) => g.projects.some((p) => p.id === id)) ?? null;
}
