export interface ProjectDetails {
  context?: string;
  problem?: string;
  approach?: string;
  outcome?: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  hook: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  tryItUrl?: string;
  bg?: string;
  duration?: number; // ms, for image/gif auto-advance
  details?: ProjectDetails;
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
    logoUrl: "/projects/app-logos/adobe-firefly.png",
    role: "Product Designer, GenAI",
    years: "2023–2025",
    description:
      "Leading design for AI-driven creative tools across audio, speech, and video. Defined interaction models for generative sound effects and speech introducing performance-based workflows, multi-model systems, and scalable patterns now informing future Adobe products.",
  },
  {
    company: "Microsoft Outlook",
    logoUrl: "/projects/app-logos/microsoft-outlook.png",
    role: "Product Designer",
    years: "2020–2022",
    description:
      "Led cross-platform design initiatives across theming, branding, and visual systems. Re-architected Outlook's surface and illustration systems in collaboration with Fluent design bringing consistency, expression, and modernity across web, desktop, and mobile.",
  },
  {
    company: "Microsoft Excel",
    logoUrl: "/projects/app-logos/microsoft-excel.png",
    role: "UX Designer",
    years: "2018–2019",
    description:
      "Designed foundational experiences including smart templates and core interaction redesigns. Focused on reducing complexity and improving usability transforming spreadsheets into more approachable, structured, and data-driven workflows.",
  },
  {
    company: "Carnegie Mellon University",
    logoUrl: "/projects/app-logos/CMU.png",
    logoRounded: false,
    role: "M.Des",
    years: "2016–2018",
  },
];

export const projectGroups: CompanyGroup[] = [
  {
    company: "Adobe Firefly",
    logoUrl: "/projects/app-logos/adobe-firefly.png",
    role: "Product Designer",
    years: "2023–2025",
    description: "Led 0→1 design of generative audio tools and multi-model UX systems.",
    projects: [
      {
        id: "generative-sfx",
        title: "Generative SFX",
        year: "2024, 2025",
        tryItUrl: "https://firefly.adobe.com/generate/sound-effects",
        hook: "Turning sound effects into something you perform in time, not describe in prompts.",
        description:
          "Defined a new interaction model for generative audio combining performance-driven input with a lightweight timeline system to enable precise, iterative sound design directly on video.",
        videoUrl: "/projects/Gen-audio/01-Generative-sound-effects.mp4",
        bg: "#000000",
        details: {
          context: "Adobe had a mature generative SFX model but no product surface, risking both wasted investment and loss of competitive positioning in AI-driven video workflows.",
          problem: "Existing approaches treated sound generation as prompt → output, disconnected from timing, motion, and creative intent. There was no clear form factor for how generative audio should integrate with video.",
          approach: "Reframed sound creation as performance in context.\n\nDefined product direction and constraints for an early-stage system:\n• performance-driven input for timing and energy control\n• attached generation sets for in-context comparison\n• lightweight timeline system for placement, snapping, and iteration\n\nMade intentional tradeoffs avoiding full DAW complexity and limiting scope (track count, duration) to prioritize clarity, speed, and adoption.",
          outcome: "Shipped a generative SFX editor across desktop & mobile web surfaces, enabling creators to compose sound directly on video.\n\nEstablished interaction patterns now informing Firefly video workflows and influencing roadmap prioritization across Express and Premiere.",
        },
      },
      {
        id: "generative-speech",
        title: "Generative Speech",
        year: "2025",
        tryItUrl: "https://firefly.adobe.com/generate/speech",
        hook: "Turning speech generation into a system for orchestration, not just output.",
        description:
          "Defined a platform approach to generative speech, supporting both Adobe and third-party models while introducing interaction patterns for previewing, iterating, and directing expressive audio.",
        videoUrl: "/projects/Gen-audio/02-Generative-speech.mp4",
        bg: "#000000",
        details: {
          context: "Adobe needed to establish a credible position in generative audio both to stay competitive and to lay the foundation for multi-media AI workflows across Creative Cloud.",
          problem: "Most speech tools optimized for output quality, but lacked control, iteration, and integration into real creative workflows. Prompt → generate was too rigid for expressive use.",
          approach: "Reframed speech generation as orchestration.\n\nDefined a platform model supporting both native and third-party speech systems, alongside reusable interaction primitives:\n• model selection with preview'able voice states\n• versioned generation history for iterative comparison\n• segment-level auditioning with emotion-aware playback\n\nMade key tradeoffs toward simplicity by intentionally avoiding timeline editing and full text tooling to prioritize speed, clarity, and early adoption.",
          outcome: "Shipped Adobe's first generative speech experience, establishing patterns now referenced across products like Express and Premiere.\n\nPositioned Adobe as a platform for generative audio enabling future expansion across tools and workflows.",
        },
      },
    ],
  },
  {
    company: "Microsoft Outlook",
    logoUrl: "/projects/app-logos/microsoft-outlook.png",
    role: "Product Designer",
    years: "2020–2022",
    description: "Drove 3D illustrations, expressive theming, and reactions UX.",
    projects: [
      {
        id: "3d-illustrations",
        title: "3D Illustrations",
        year: "2021, 2022",
        tryItUrl: "https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook?deeplink=%2Fmail%2F&sdf=0",
        hook: "Moving illustrations from decorative assets to integrated product language.",
        description:
          "Defined a scalable 3D visual system for Outlook bridging brand direction with product needs to create cohesive, expressive interfaces across platforms.",
        videoUrl: "/projects/3d-illustrations/01-3D-Illustrations.mp4",
        bg: "#f4f4f4",
        details: {
          context: "Outlook's visual system felt fragmented and outdated. As Microsoft evolved Fluent design, there was a need to modernize illustration while aligning with a broader cross-product brand system.",
          problem: "Existing illustrations were flat, literal, and inconsistent often functioning as decorative elements disconnected from the interface. Horizontal brand systems lacked product-specific nuance.",
          approach: "Reframed illustration as part of the interface not layered on top.\n\nPartnered closely with the Fluent design team to define a product-specific visual grammar for Outlook, introducing:\n• dimensional forms with integrated depth and elevation\n• symbolic, inclusive metaphors over literal depictions\n• shared color and material systems aligned with Fluent\n\nBalanced system consistency with product identity adapting the broader language while ensuring relevance to Outlook users.\n\nNavigated technical constraints by developing scalable variants (3D, 2.5D, vector) across surfaces and performance requirements.",
          outcome: "Produced and shipped 100+ illustrations across web, desktop, and mobile (light and dark modes).\n\nReplaced fragmented visuals with a unified, scalable system establishing a shared library and guidelines adopted across Outlook experiences.",
        },
      },
      {
        id: "expressive-theming",
        title: "Expressive Theming",
        year: "2022",
        hook: "Evolving theming from visual decoration to a coherent environment for focused work.",
        description:
          "Redefined Outlook's surface system across platforms balancing personal expression with clarity and consistency through an opinionated, scalable theming model.",
        imageUrl: "/projects/expressive-theming/02-Cross-platform.png",
        bg: "#f4f4f4",
        duration: 30000,
        details: {
          context: "As Outlook modernized alongside Windows and Fluent design, theming became fragmented across platforms resulting in inconsistent and outdated user experiences.",
          problem: "Existing themes functioned as surface-level decoration (banners, colors) without integrating into the product's structure. There was no cohesive system to balance personalization with usability and brand consistency.",
          approach: "Reframed theming as an environment not decoration.\n\nRedefined the surface architecture across Outlook, including base layers, containers, and elevation systems. Introduced an opinionated theming model:\n• curated set of high-quality themes (neutral, color, image, pride)\n• dynamic light/dark adaptation\n• redesigned color ramps using hue torsion, saturation rhythm, and perceived brightness\n\nMade intentional tradeoffs avoiding full customization to preserve quality, coherence, and focus.\n\nAligned across Windows, Fluent, and product teams to ensure consistency across web, desktop, and mobile.",
          outcome: "Shipped a unified theming system across Outlook platforms, replacing fragmented banner-based customization.\n\nEstablished a scalable, consistent visual environment balancing personal expression with clarity and focus across the product ecosystem.",
        },
      },
    ],
  },
  {
    company: "Microsoft Excel",
    logoUrl: "/projects/app-logos/microsoft-excel.png",
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
        videoUrl: "/projects/smart-templates/01-Excel-x-Wolfram-templates.mp4",
        bg: "#000000",
        details: {
          context: "Adobe needed to establish a credible position in generative audio—both to stay competitive and to lay the foundation for multi-media AI workflows across Creative Cloud.",
          problem: "Most speech tools optimized for output quality, but lacked control, iteration, and integration into real creative workflows. Prompt → generate was too rigid for expressive use.",
          approach: "Reframed speech generation as orchestration.\n\nDefined a platform model supporting both native and third-party speech systems, alongside reusable interaction primitives:\n• model selection with preview'able voice states\n• versioned generation history for iterative comparison\n• segment-level auditioning with emotion-aware playback\n\nMade key tradeoffs toward simplicity, intentionally avoiding timeline editing and full text tooling to prioritize speed, clarity, and early adoption.",
          outcome: "Adobe needed to establish a credible position in generative audio—both to stay competitive and to lay the foundation for multi-media AI workflows across Creative Cloud.",
        },
      },
      {
        id: "ux-redesigns",
        title: "UX Redesigns",
        year: "2018",
        hook: "Redefining how complexity is experienced in spreadsheets.",
        description:
          "Modernized core Excel interactions balancing familiarity with web-native patterns to make powerful workflows feel lighter, faster, and more approachable.",
        videoUrl: "/projects/ux-redesigns/01-Core-feature-redesigns.mp4",
        bg: "#ffffff",
        details: {
          context: "As Excel expanded to the web, there was a need to modernize its interaction model improving usability while remaining competitive with tools like Google Sheets.",
          problem: "Core interactions (sorting, filtering, shortcuts) were powerful but dense often carried over from desktop paradigms without adapting to web expectations. Complexity made the product feel daunting, especially for newer users.",
          approach: "Focused on simplifying complexity without removing power.\n\nRedefined key interaction systems:\n• improved defaults and clarity for sorting and filtering workflows\n• contextual, web-native interaction patterns for discoverability\n• reimagined keyboard shortcuts as both efficiency tools and a way to orient users within product structure\n\nBalanced modernization with familiarity ensuring transitions from desktop to web remained intuitive.",
          outcome: "Shipped redesigned sorting, filtering, and shortcut systems on Excel web.\n\nImproved usability and approachability while preserving the depth and flexibility expected from a power tool.",
        },
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
