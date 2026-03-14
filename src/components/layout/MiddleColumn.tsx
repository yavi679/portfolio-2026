import { ReactNode } from "react";

interface MiddleColumnProps {
  children?: ReactNode;
}

export default function MiddleColumn({ children }: MiddleColumnProps) {
  if (children) return <div className="p-6">{children}</div>;

  return (
    <div className="p-6">
      <section id="work">
        <h2 className="text-lg font-semibold mb-6">Work</h2>
        <p className="text-muted-foreground text-sm">
          Projects will appear here once Figma designs are shared.
        </p>
      </section>
    </div>
  );
}
