import { ReactNode } from "react";
import LeftColumn from "./LeftColumn";
import MiddleColumn from "./MiddleColumn";
import RightColumn from "./RightColumn";

interface ThreeColumnLayoutProps {
  left?: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
}

export default function ThreeColumnLayout({
  left,
  middle,
  right,
}: ThreeColumnLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
      <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-r border-border">
        <LeftColumn>{left}</LeftColumn>
      </aside>
      <main className="min-h-screen overflow-y-auto">
        <MiddleColumn>{middle}</MiddleColumn>
      </main>
      <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-l border-border">
        <RightColumn>{right}</RightColumn>
      </aside>
    </div>
  );
}
