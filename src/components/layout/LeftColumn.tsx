import { ReactNode } from "react";

interface LeftColumnProps {
  children?: ReactNode;
}

export default function LeftColumn({ children }: LeftColumnProps) {
  if (children) return <div className="p-6 h-full">{children}</div>;

  return (
    <div className="p-6 h-full flex flex-col gap-8">
      {/* Name + title */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Vikas Yadav</h1>
        <p className="text-sm text-muted-foreground mt-1">Product Designer</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        <a href="#work" className="text-sm hover:text-foreground text-muted-foreground transition-colors">Work</a>
        <a href="#about" className="text-sm hover:text-foreground text-muted-foreground transition-colors">About</a>
        <a href="#contact" className="text-sm hover:text-foreground text-muted-foreground transition-colors">Contact</a>
      </nav>

      {/* Social links */}
      <div className="mt-auto flex flex-col gap-2">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Twitter
        </a>
        <a
          href="mailto:hello@vikasyadav.com"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Email
        </a>
      </div>
    </div>
  );
}
