import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RightColumnProps {
  children?: ReactNode;
}

const skills = [
  "Product Design",
  "UX Research",
  "Figma",
  "Prototyping",
  "Design Systems",
  "Motion Design",
];

export default function RightColumn({ children }: RightColumnProps) {
  if (children) return <div className="p-6 h-full">{children}</div>;

  return (
    <div className="p-6 h-full flex flex-col gap-8">
      {/* About */}
      <section id="about">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          About
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Designer focused on crafting thoughtful digital experiences.
          Previously at — . Open to new opportunities.
        </p>
      </section>

      <Separator />

      {/* Skills */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* Contact */}
      <section id="contact">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Contact
        </h2>
        <a
          href="mailto:hello@vikasyadav.com"
          className="text-sm hover:text-foreground text-muted-foreground transition-colors"
        >
          hello@vikasyadav.com
        </a>
      </section>
    </div>
  );
}
